import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent {
  private readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
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
        this.snackBar.open(`Bienvenue ${user.displayName} !`, 'Fermer', { duration: 3000 });
        this.authenticated.emit();
      },
      error: () =>
        this.snackBar.open('Connexion impossible. Vérifie les informations saisies.', 'Fermer', { duration: 4000 }),
    });
  }
}
