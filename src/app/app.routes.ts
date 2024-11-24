import { Routes } from '@angular/router';
import { managerAuthGuard } from './guards/manager-auth.guard';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { HomeComponent } from './components/admin/home/home.component';
import { CarListComponent } from './components/admin/car-list/car-list.component';
import { CarDetailComponent } from './components/admin/car-detail/car-detail.component';
import { CarAddComponent } from './components/admin/car-add/car-add.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { ManagerDashboardComponent } from './components/manager/manager-dashboard/manager-dashboard.component';

export const routes: Routes = [
    { path: 'manager', title: 'Manager', component: ManagerDashboardComponent,
    canActivate:[managerAuthGuard] },
    {
      path: 'admin', title: 'Admin', component: AdminDashboardComponent,
      canActivate:[adminAuthGuard],
      children: [
        { path: 'home', title: 'Accueil', component: HomeComponent },
        { path: 'cars', title: 'Voitures', component: CarListComponent },
        { path: 'cars/:id', title: 'Détail Voiture', component: CarDetailComponent },
        { path: 'addcar', title: 'Ajout Voiture', component: CarAddComponent },
        { path: '', redirectTo: 'home', pathMatch: 'full' }
      ]
    },
    { path: 'login', title: 'Login', component:  LoginComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', title: 'Erreur', component: ErrorComponent }
  ];
