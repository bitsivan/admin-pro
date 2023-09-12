import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import Swal from 'sweetalert2';

declare const google: any;
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;
  constructor(private http: HttpClient,
    private router: Router) {
    this.user = new User('ivan', 'ivan@gmail.com')
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.user.uid || '';
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${baseUrl}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      tap((resp: any) => {
        const {
          name,
          email,
          password,
          img = '',
          google,
          role,
          uid } = resp.user;


        localStorage.setItem('token', resp.token);
        this.user = new User(name, email, '', img, google, role, uid);
      }),
      map(resp => true),
      catchError(error => of(false))
    );
  }

  createUser(formData: RegisterForm) {
    console.log('create user;')

    return this.http.post(`${baseUrl}/users/`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

  updateUser(data: { name: string, email: string, role: string }) {
    data= {
      ...data,
      role: this.user.role || 'USER_ROLE'
    };
    return this.http.put(`${baseUrl}/users/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      tap(()=>{
        Swal.fire('Success', 'User updated.', 'success');
      })
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${baseUrl}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

  logout() {
    localStorage.removeItem('token');
    google.accounts.id.revoke('ivanny20@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })
  }

  loginGoogle(token: string) {
    console.log('http token--> ', token);
    return this.http.post(`${baseUrl}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

}
