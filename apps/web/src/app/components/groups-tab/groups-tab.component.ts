import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import {
  AvailableGroupCompetition,
  GroupDetails,
  GroupsApiService,
  GroupSummary,
} from '../../../services/groups-api.service';
import { I18nService } from '../../i18n/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { buildGroupInvitationLink } from './group-invitation-link';

@Component({
  selector: 'app-groups-tab',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    TranslatePipe,
    RouterLink,
  ],
  templateUrl: './groups-tab.component.html',
  styleUrl: './groups-tab.component.css',
})
export class GroupsTabComponent implements OnInit {
  private readonly api = inject(GroupsApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);
  private readonly i18n = inject(I18nService);
  readonly competitions = signal<AvailableGroupCompetition[]>([]);
  readonly createForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(60)],
    }),
    competitionKey: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    isPublic: new FormControl(false, { nonNullable: true }),
  });
  readonly code = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  readonly search = new FormControl('', { nonNullable: true });
  readonly groups = signal<GroupSummary[]>([]);
  readonly publicGroups = signal<GroupSummary[]>([]);
  readonly selected = signal<GroupDetails | undefined>(undefined);
  readonly busy = signal(false);
  readonly confirmingDelete = signal(false);
  @Input({ required: true }) userId = '';

  ngOnInit(): void {
    const invitationCode = this.route.snapshot.queryParamMap.get('invite');
    if (invitationCode) this.code.setValue(invitationCode);
    this.loadMine();
    this.searchPublic();
    this.loadCompetitions();
  }
  loadMine(selectId?: string): void {
    this.api.mine().subscribe({
      next: (groups) => {
        this.groups.set(groups);
        const groupToOpen = selectId ?? (!this.selected() ? groups[0]?.id : undefined);
        if (groupToOpen) this.open(groupToOpen);
      },
      error: () => this.error(),
    });
  }
  searchPublic(): void {
    this.api
      .search(this.search.value)
      .subscribe({ next: (groups) => this.publicGroups.set(groups), error: () => this.error() });
  }
  open(id: string): void {
    this.api.get(id).subscribe({ next: (group) => this.selected.set(group), error: () => this.error() });
  }
  create(): void {
    if (this.createForm.invalid) return;
    const { name, competitionKey, isPublic } = this.createForm.getRawValue();
    const competition = this.competitions().find((item) => this.competitionKey(item) === competitionKey);
    if (!competition) return;
    this.busy.set(true);
    this.api
      .create({ name, league: competition.league, tournament: competition.tournament, isPublic })
      .pipe(finalize(() => this.busy.set(false)))
      .subscribe({
        next: (group) => {
          this.createForm.controls.name.reset('');
          this.selected.set(group);
          this.groups.update((groups) => [group, ...groups.filter(({ id }) => id !== group.id)]);
          this.notice('groups.created');
          this.loadMine();
        },
        error: () => this.error(),
      });
  }
  competitionKey(competition: Pick<AvailableGroupCompetition, 'league' | 'tournament'>): string {
    return `${competition.league}\u0000${competition.tournament}`;
  }
  isMember(groupId: string): boolean {
    return this.groups().some(({ id }) => id === groupId);
  }
  private loadCompetitions(): void {
    this.api.competitions().subscribe({
      next: (competitions) => {
        this.competitions.set(competitions);
        if (!this.createForm.controls.competitionKey.value && competitions.length) {
          this.createForm.controls.competitionKey.setValue(this.competitionKey(competitions[0]));
        }
      },
      error: () => this.error(),
    });
  }
  joinCode(): void {
    if (this.code.invalid) return;
    this.join(this.api.joinByCode(this.code.value));
  }
  joinPublic(id: string): void {
    this.join(this.api.joinPublic(id));
  }
  invitationLink(group: GroupDetails): string {
    if (!group.invitationCode) return '';
    return buildGroupInvitationLink(window.location.origin + window.location.pathname, group.invitationCode);
  }
  async copyInvitationLink(group: GroupDetails): Promise<void> {
    const link = this.invitationLink(group);
    if (!link) return;
    const message = this.i18n.translate('groups.invitationClipboardMessage', { group: group.name, link });
    try {
      await navigator.clipboard.writeText(message);
      this.snackBar.open(this.i18n.translate('groups.invitationLinkCopied'), this.i18n.translate('common.close'), {
        duration: 3000,
      });
    } catch {
      this.snackBar.open(message, this.i18n.translate('common.close'), { duration: 8000 });
    }
  }
  deleteSelected(): void {
    const group = this.selected();
    if (!group || group.ownerId !== this.userId) return;
    this.busy.set(true);
    this.api
      .delete(group.id)
      .pipe(finalize(() => this.busy.set(false)))
      .subscribe({
        next: () => {
          const remainingGroups = this.groups().filter(({ id }) => id !== group.id);
          this.groups.set(remainingGroups);
          this.publicGroups.update((groups) => groups.filter(({ id }) => id !== group.id));
          this.selected.set(undefined);
          this.confirmingDelete.set(false);
          if (remainingGroups[0]) this.open(remainingGroups[0].id);
          this.notice('groups.deleted');
        },
        error: () => this.error(),
      });
  }
  private join(request: ReturnType<GroupsApiService['joinByCode']>): void {
    this.busy.set(true);
    request.pipe(finalize(() => this.busy.set(false))).subscribe({
      next: (group) => {
        this.code.reset('');
        this.notice('groups.joined');
        this.loadMine(group.id);
        this.searchPublic();
      },
      error: () => this.error(),
    });
  }
  private notice(key: 'groups.created' | 'groups.joined' | 'groups.deleted'): void {
    this.snackBar.open(this.i18n.translate(key), this.i18n.translate('common.close'), { duration: 3000 });
  }
  private error(): void {
    this.snackBar.open(this.i18n.translate('groups.error'), this.i18n.translate('common.close'), { duration: 4000 });
  }
}
