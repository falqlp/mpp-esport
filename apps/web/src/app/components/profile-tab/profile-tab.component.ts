import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { AuthService, AuthUser, CompetitionKey } from '../../../services/auth.service';
import { COMPETITIONS } from '../../competition.utils';

@Component({
  selector: 'app-profile-tab',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './profile-tab.component.html',
  styleUrl: './profile-tab.component.css',
})
export class ProfileTabComponent implements OnChanges {
  private readonly auth = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);
  @Input({ required: true }) user!: AuthUser;
  @Output() readonly saved = new EventEmitter<void>();
  readonly search = new FormControl('', { nonNullable: true });
  readonly selected = new FormControl<CompetitionKey[]>([], { nonNullable: true });
  saving = false;

  ngOnChanges(): void {
    this.selected.setValue(this.user.favoriteCompetitions, { emitEvent: false });
  }
  filteredOptions() {
    const query = this.search.value.trim().toLowerCase();
    return query ? COMPETITIONS.filter(({ label }) => label.toLowerCase().includes(query)) : COMPETITIONS;
  }
  toggle(key: CompetitionKey, enabled: boolean): void {
    const values = new Set(this.selected.value);
    if (enabled) values.add(key);
    else values.delete(key);
    this.selected.setValue([...values]);
  }
  save(): void {
    this.saving = true;
    this.auth
      .updateFavoriteCompetitions(this.selected.value)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.snackBar.open('Compétitions favorites enregistrées !', 'Fermer', { duration: 3000 });
          this.saved.emit();
        },
        error: () => this.snackBar.open("Les favoris n'ont pas pu être enregistrés.", 'Fermer', { duration: 4000 }),
      });
  }
}
