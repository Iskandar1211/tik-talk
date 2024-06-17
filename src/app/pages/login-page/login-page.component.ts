import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

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

  onSubmit() {
    const { username, password } = this.form.value;
    console.log('username', username);

    this.authService
      //@ts-ignore
      .onLogin({ username, password })
      ?.subscribe((data) => console.log('data', data));
  }
}
