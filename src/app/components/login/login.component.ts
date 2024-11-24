import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  message: string = "";


  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly loginService: LoginService = inject(LoginService);
  private readonly router: Router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.fb.nonNullable.group({
      username: ['', Validators.required],
      pwd: ['', Validators.required]
    })
  }

  public get Username() {
    return this.loginForm.get('username');
  }

  public get Pwd() {
    return this.loginForm.get('pwd');
  }
  login() {
    const { username, pwd } = this.loginForm.value;
    this.loginService.login(username, pwd).subscribe(
      users => {
        if (users.length == 0) {
          this.message = "Login ou mot de passe incorrect";
          localStorage.setItem('role', 'none');
        }
        else {
          let role = users[0].role;
          if (role == 'Admin')
            this.router.navigate(["/admin"]);
          else
            this.router.navigate(["/manager"]);
          localStorage.setItem('role', role);
          this.message = ""
        }
      }
    )
  }
}
