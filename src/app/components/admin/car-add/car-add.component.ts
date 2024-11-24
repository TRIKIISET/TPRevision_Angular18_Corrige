import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Brand } from '../../../model/brand';
import { CarService } from '../../../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './car-add.component.html',
  styleUrl: './car-add.component.css'
})
export class CarAddComponent {
  carForm!: FormGroup;
  brands = Object.values(Brand);
  private readonly fb: FormBuilder= inject(FormBuilder);
  private readonly carService:CarService = inject(CarService);
  private readonly router: Router = inject(Router);


  ngOnInit(): void {
    this.carForm = this.fb.nonNullable.group({
       infos:this.fb.nonNullable.group({
        brand:[Brand.Ford,Validators.required],
        model:['',[Validators.required, Validators.minLength(2)]],
        immatriculation:["", [Validators.required, Validators.pattern('^[1-9][0-9]{1,2}TU[0-9]{3,4}$')]]
       }),
      power: [4, Validators.min(4)],
      photo: ['', Validators.required],
       circulationDate: [''],
       isAutomatic:[true],
       accessoryList:this.fb.array([])
    })
  }

  public get accessoryList(){
    return this.carForm.get('accessoryList') as FormArray;
  }

  onAddCar(){
    this.carService.addCar( this.carForm.value)
    .subscribe(
      data => this.router.navigate(['/admin/cars'])
    )
}
onAddAccessory(){
  this.accessoryList.push(this.fb.nonNullable.group({
    property:['', Validators.required],
    value:['', Validators.required]
  }))
}

onDeleteAccessory(i:number){
  this.accessoryList.removeAt(i)
}

onClear(){
  this.carForm.reset();
  this.accessoryList.clear();
}

get Model(){
  return this.carForm.get('infos')?.get('model');
}
get Immatriculation(){
  return this.carForm.get('infos')?.get('immatriculation');
}
isValidPatternImm(){
  return this.Immatriculation?.errors?.['pattern'] && this.Immatriculation.dirty;
}
isRequiredImm(){
  return this.Immatriculation?.errors?.['required'] && this.Immatriculation.dirty;
}
}
