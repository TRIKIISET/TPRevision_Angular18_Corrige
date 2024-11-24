import { Component, inject, OnInit } from '@angular/core';
import { Car } from '../../../model/car';
import { CarService } from '../../../services/car.service';
import { CarItemComponent } from '../car-item/car-item.component';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CarItemComponent],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit{

  cars: Car[]=[];
  allCars: Car[]=[];
  private carService: CarService = inject(CarService);

  ngOnInit(): void {
    this.carService.getCars()
    .subscribe(
      data => {
        this.cars = data;
        this.allCars = data
      }
    )
  }

  onSearch(chaine:string){
    this.cars = this.allCars.filter
     (e => e.infos.brand.toLowerCase().search(chaine.toLowerCase())>=0);
  }
  onDeleteCar(id:string){
    this.cars = this.cars.filter(e => e.id !=id) ;
    this.allCars = this.allCars.filter(e => e.id !=id) ;
}

}
