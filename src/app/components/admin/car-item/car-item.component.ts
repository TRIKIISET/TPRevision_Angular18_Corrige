import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Car } from '../../../model/car';
import { CarService } from '../../../services/car.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-car-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './car-item.component.html',
  styleUrl: './car-item.component.css'
})
export class CarItemComponent {

  @Input() car!: Car;
  @Input() position!: number;
  @Output() notify = new EventEmitter<string>();
 
  private readonly carService: CarService = inject(CarService);

  onDeleteCar(id:string){
    this.carService.deleteCar(id)
    .subscribe(
        ()=>this.notify.emit(id)
    )
  }
}

