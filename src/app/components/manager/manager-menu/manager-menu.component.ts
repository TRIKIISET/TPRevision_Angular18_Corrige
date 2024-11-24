import { Component, inject } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-manager-menu',
  standalone: true,
  imports: [RouterLinkActive],
  templateUrl: './manager-menu.component.html',
  styleUrl: './manager-menu.component.css'
})
export class ManagerMenuComponent {

    private router: Router = inject(Router);
    private readonly loginService:LoginService = inject (LoginService);

  onDisconnect(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
