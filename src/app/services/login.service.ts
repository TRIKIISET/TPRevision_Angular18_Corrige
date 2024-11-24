import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { User } from '../model/user';

const URL = environment.apiUrl+"/users";
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly http:HttpClient= inject(HttpClient)

  public login(username:string, pwd:string):Observable<User[]>{
    return this.http.get<User[]>(`${URL}?username=${username}&pwd=${pwd}`);
  }

  public logout(){
    localStorage.removeItem('role');
  }
}
