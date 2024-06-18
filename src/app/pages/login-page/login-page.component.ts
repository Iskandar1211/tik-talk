import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  authService = inject(AuthService);
  router = inject(Router);

  onSubmit() {
    const { username, password } = this.form.value;

    this.authService
      //@ts-ignore
      .onLogin({ username, password })
      .subscribe((data) => {
        this.router.navigate(['']);
      });
  }
}
