import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../../../model/car';
import { CarService } from '../../../services/car.service';
import { ManagerMenuComponent } from '../manager-menu/manager-menu.component';
import { AsyncPipe, NgClass, UpperCasePipe } from '@angular/common';
import { ImmatriculationPipe } from '../../../pipes/immatriculation.pipe';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [ManagerMenuComponent, AsyncPipe, UpperCasePipe, ImmatriculationPipe, NgClass],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent implements OnInit{

  carsList$ !: Observable<Car[]>
  private readonly carService:CarService = inject(CarService);

  ngOnInit(): void {
    this.carsList$ = this.carService.getCars();
  }
}
