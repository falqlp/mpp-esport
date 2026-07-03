import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { I18nService } from '../../i18n/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-auth-page',
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
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent {
  private readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  private readonly i18n = inject(I18nService);
  @Output() readonly authenticated = new EventEmitter<void>();
  mode: 'login' | 'register' = 'login';
  loading = false;
  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    displayName: ['', Validators.minLength(2)],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  submit(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, displayName, password } = this.form.getRawValue();
    this.loading = true;
    const request =
      this.mode === 'login' ? this.auth.login(email, password) : this.auth.register(email, displayName, password);
    request.pipe(finalize(() => (this.loading = false))).subscribe({
      next: ({ user }) => {
        this.snackBar.open(
          this.i18n.translate('auth.welcome', { name: user.displayName }),
          this.i18n.translate('common.close'),
          { duration: 3000 },
        );
        this.authenticated.emit();
      },
      error: () =>
        this.snackBar.open(this.i18n.translate('auth.error'), this.i18n.translate('common.close'), { duration: 4000 }),
    });
  }
}
