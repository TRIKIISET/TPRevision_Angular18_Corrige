import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Car } from '../../../model/car';
import { Brand } from '../../../model/brand';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../../../services/car.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-car-update',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './car-update.component.html',
  styleUrl: './car-update.component.css'
})
export class CarUpdateComponent implements OnInit{
  @Input() car!: Car;
  @Output()updateDone = new EventEmitter<Car>();

  brands = Object.values(Brand);
  carForm!: FormGroup;
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly carService: CarService = inject(CarService);

  ngOnInit(): void {
    this.carForm = this.fb.nonNullable.group({
      id: this.car.id,
      infos: this.fb.nonNullable.group({
        brand: [this.car.infos.brand, Validators.required],
        model: [this.car.infos.model,[Validators.required, Validators.minLength(2)]],
        immatriculation:[this.car.infos.immatriculation, [Validators.required, Validators.pattern('^[1-9][0-9]{1,2}TU[0-9]{3,4}$')]]
      }),
      power: [this.car.power, Validators.min(4)],
      photo: [this.car.photo, Validators.required],
      circulationDate: [this.car.circulationDate],
      isAutomatic: [this.car.isAutomatic],
      accessoryList: this.fb.array(this.car.accessoryList.map
        (a => this.fb.nonNullable.group({
          property: [a.property, Validators.required],
          value: [a.value, Validators.required]
        })
        ))
    })
  }
// Pour les accessoires, il est est toujours possible de faire une boucle qui parcout this.voiture.listAccessoires
 // Et à chaque itération, on fait avec un push au formArray 
  public get accessoryList() {
    return this.carForm.get('accessoryList') as FormArray;
  }
  onDeleteAccessory(i:number){
    this.accessoryList.removeAt(i)
  }
  onUpdateCar() {
    let idVoiture = this.car.id
    console.log(this.carForm.value)
   this.carService.updateCar(idVoiture,this.carForm.value)
     .subscribe(
       data => this.updateDone.emit(this.carForm.value)
     )
  }
  onAddAccessory() {
    this.accessoryList.push(this.fb.group({
      property: ['', Validators.required],
      value: ['', Validators.required]
    }))
  }
}
