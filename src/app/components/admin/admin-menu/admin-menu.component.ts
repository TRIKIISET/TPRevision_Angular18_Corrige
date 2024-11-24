import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.css'
})
export class AdminMenuComponent {

  private readonly router: Router = inject(Router);
  private readonly loginService: LoginService = inject(LoginService);

onDisconnect(){
  this.loginService.logout();
  this.router.navigate(['/login']);
}
}
