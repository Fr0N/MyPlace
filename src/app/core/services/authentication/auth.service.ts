import { Router } from '@angular/router';
import { HttpClientService } from './../http-client.service';
import { RegisterModel } from './../../models/register.model';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LoginModel } from './../../models/login.model';
import { Injectable } from '@angular/core';



@Injectable()
export class AuthService {

  public redirectUrl: string;

  public currentAuthtoken: string;

  constructor(
    private httpClientService: HttpClientService,
    private router: Router
  ) { }

  get authtoken() {
    return this.currentAuthtoken;
  }

  set authtoken(value: string) {
    this.currentAuthtoken = value;
  }

  login(data: LoginModel): Observable<Object> {
    return this.httpClientService.post("user", "login", "Basic", JSON.stringify(data));
  }

  register(data: RegisterModel): Observable<Object> {
    return this.httpClientService.post("user", "", "Basic", JSON.stringify(data));
  }

  update(data: RegisterModel, id : number): Observable<Object> {
    return this.httpClientService.put("user", "" + id, "Kinvey", JSON.stringify(data));
  }

  logout(): Observable<Object> {
    return this.httpClientService.post("user", "_logout", "Kinvey", {});
  }

  isLoggedIn(): boolean {
    
    let currentAuthtoken: string = localStorage.getItem('authtoken');
    return currentAuthtoken ? true : false;
  }

  tryNavigate() {
    if(this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
    } else {
      this.router.navigate([""]);
    }
  }

}
