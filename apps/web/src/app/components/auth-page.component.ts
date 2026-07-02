import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-auth-page', standalone: true, imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
  template: `<mat-card appearance="outlined"><mat-card-header><mat-card-subtitle>Compte joueur</mat-card-subtitle><mat-card-title>{{ mode === 'login' ? 'Connexion' : 'Créer un compte' }}</mat-card-title></mat-card-header><mat-card-content><form [formGroup]="form" (ngSubmit)="submit()">
    <mat-form-field appearance="outline"><mat-label>Email</mat-label><input matInput type="email" formControlName="email" autocomplete="email"></mat-form-field>
    @if (mode === 'register') { <mat-form-field appearance="outline"><mat-label>Nom affiché</mat-label><input matInput formControlName="displayName" autocomplete="nickname"></mat-form-field> }
    <mat-form-field appearance="outline"><mat-label>Mot de passe</mat-label><input matInput type="password" formControlName="password" autocomplete="current-password"></mat-form-field>
    <button mat-flat-button type="submit" [disabled]="loading">{{ loading ? 'Patiente…' : mode === 'login' ? 'Se connecter' : "S'inscrire" }}</button>
    <button mat-button type="button" (click)="mode = mode === 'login' ? 'register' : 'login'">{{ mode === 'login' ? 'Créer un compte' : "J'ai déjà un compte" }}</button>
  </form></mat-card-content></mat-card>`,
  styles: [`mat-card { margin: clamp(48px,10vh,110px) auto 0; max-width:520px; padding:18px; } mat-card-header { margin-bottom:12px; } form { display:grid; gap:4px; } mat-form-field { width:100%; }`],
})
export class AuthPageComponent {
  private readonly auth = inject(AuthService); private readonly fb = inject(FormBuilder); private readonly snackBar = inject(MatSnackBar);
  @Output() readonly authenticated = new EventEmitter<void>();
  mode: 'login' | 'register' = 'login'; loading = false;
  readonly form = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]], displayName: ['', Validators.minLength(2)], password: ['', [Validators.required, Validators.minLength(8)]] });
  submit(): void { if (this.form.invalid || this.loading) { this.form.markAllAsTouched(); return; } const { email, displayName, password } = this.form.getRawValue(); this.loading = true;
    const request = this.mode === 'login' ? this.auth.login(email, password) : this.auth.register(email, displayName, password);
    request.pipe(finalize(() => this.loading = false)).subscribe({ next: ({ user }) => { this.snackBar.open(`Bienvenue ${user.displayName} !`, 'Fermer', { duration:3000 }); this.authenticated.emit(); }, error: () => this.snackBar.open('Connexion impossible. Vérifie les informations saisies.', 'Fermer', { duration:4000 }) }); }
}
