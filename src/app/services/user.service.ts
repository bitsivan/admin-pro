import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private router: Router) { }

  validateToken(): Observable<boolean>{
    const token=localStorage.getItem('token') || '';
    return this.http.get(`${baseUrl}/login/renew`,{
      headers:{
        'x-token': token
      }
    }).pipe(
      tap((resp: any) =>{
        localStorage.setItem('token', resp.token)
      }),
      map(resp=>true),
      catchError(error => of(false))
    );
  }

  createUser(formData: RegisterForm) {
    console.log('create user;')

    return this.http.post(`${baseUrl}/users`, formData)
    .pipe(
      tap((resp: any)=>{
        localStorage.setItem('token', resp.token)
      })
    )
  }

  login(formData: LoginForm) {
    return this.http.post(`${baseUrl}/login`, formData)
      .pipe(
        tap((resp: any)=>{
          localStorage.setItem('token', resp.token)
        })
      )
  }

  logout(){
    localStorage.removeItem('token');
    google.accounts.id.revoke('ivanny20@gmail.com', () =>{
      this.router.navigateByUrl('/login');
    })
  }

  getToken(){
    return localStorage.getItem('token');
  }

  loginGoogle(token: string){
    console.log('http token--> ', token);
    return this.http.post(`${baseUrl}/login/google`, {token})
      .pipe(
        tap((resp: any)=>{
          localStorage.setItem('token', resp.token)
        })
      )
  }

}
