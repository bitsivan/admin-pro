import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserService } from './user.service';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =this.userService.token;
    if(token){
      request = request.clone({
        setHeaders:{
          'Content-Type':'application/json',
          'x-token': token
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err)=>{
          //const error = err.message || err.statusText;
          Swal.fire('Error', err.error.msg, 'error');
          return throwError(err.error.msg);
      })
    );
  }
}
