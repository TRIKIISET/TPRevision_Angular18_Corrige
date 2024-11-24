import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Car } from '../model/car';
import { HttpClient } from '@angular/common/http';

const URL = environment.apiUrl+'/voitures';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }
 
  http: HttpClient = inject(HttpClient);

  public getCars():Observable<Car[]>{
    return this.http.get<Car[]>(URL);
  }

  public getCarById(id:string):Observable<Car>{
    return this.http.get<Car>(`${URL}/${id}`)
  }
  public addCar(c:Car):Observable<Car>{
    return this.http.post<Car>(URL, c);
  }
  public updateCar(id:string,c:Car):Observable<Car>{
    return this.http.put<Car>(URL+"/"+id, c);
  }
  public deleteCar(id:string){
    return this.http.delete(URL+"/"+id);
  }
}
