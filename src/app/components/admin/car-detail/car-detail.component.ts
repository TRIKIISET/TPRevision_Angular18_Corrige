import { Component, inject, OnInit } from '@angular/core';
import { Car } from '../../../model/car';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarService } from '../../../services/car.service';
import { ImmatriculationPipe } from '../../../pipes/immatriculation.pipe';
import { DatePipe } from '@angular/common';
import { CarUpdateComponent } from '../car-update/car-update.component';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [ImmatriculationPipe, DatePipe,CarUpdateComponent, RouterLink],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit{

  car!:Car;  
  dep!:string;
  display :boolean = false;

  private readonly activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  private readonly carService:CarService = inject(CarService);


  ngOnInit(): void {
    let idCar! :string;
    this.activatedRoute.params.subscribe(
      res => {
        idCar = res["id"];
        this.carService.getCarById(idCar)
        .subscribe(
          data => {
            this.car = data;            
          }
        )
      }
    );
   
  }

  onUpdateCar(c: Car){
    this.car = c;    
  }

}
