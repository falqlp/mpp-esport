import { Component, inject, Input, OnChanges, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { AuthService, AuthUser } from '../../../services/auth.service';
import { I18nService } from '../../i18n/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { profileSaveLabel } from './user-profile.view-model';

const LOCALES = { en: 'en-US', fr: 'fr-FR', es: 'es-ES', pt: 'pt-PT', de: 'de-DE', it: 'it-IT' } as const;

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    TranslatePipe,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnChanges {
  private readonly auth = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);
  readonly i18n = inject(I18nService);
  @Input({ required: true }) user!: AuthUser;
  readonly bio = new FormControl('', { nonNullable: true });
  readonly avatarUrl = signal<string | null>(null);
  saving = false;

  get saveLabel() {
    return profileSaveLabel(this.saving);
  }

  ngOnChanges(): void {
    this.bio.setValue(this.user.bio ?? '', { emitEvent: false });
    this.avatarUrl.set(this.user.avatarUrl);
  }

  get memberSince(): string {
    return new Intl.DateTimeFormat(LOCALES[this.i18n.language()], { dateStyle: 'long' }).format(
      new Date(this.user.createdAt),
    );
  }

  async selectPhoto(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5_000_000) {
      this.showMessage('profile.photoError');
      return;
    }
    try {
      this.avatarUrl.set(await this.resizePhoto(file));
    } catch {
      this.showMessage('profile.photoError');
    }
  }

  removePhoto(): void {
    this.avatarUrl.set(null);
  }

  save(): void {
    this.saving = true;
    this.auth
      .updateProfile({ bio: this.bio.value.trim() || null, avatarUrl: this.avatarUrl() })
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => this.showMessage('profile.detailsSaved'),
        error: () => this.showMessage('profile.detailsError'),
      });
  }

  private resizePhoto(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(image.src);
        const size = 320;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext('2d');
        if (!context) return reject(new Error('Canvas unavailable'));
        const sourceSize = Math.min(image.naturalWidth, image.naturalHeight);
        const sourceX = (image.naturalWidth - sourceSize) / 2;
        const sourceY = (image.naturalHeight - sourceSize) / 2;
        context.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, size, size);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      image.onerror = () => reject(new Error('Invalid image'));
      image.src = URL.createObjectURL(file);
    });
  }

  private showMessage(key: 'profile.photoError' | 'profile.detailsSaved' | 'profile.detailsError'): void {
    this.snackBar.open(this.i18n.translate(key), this.i18n.translate('common.close'), { duration: 4000 });
  }
}
