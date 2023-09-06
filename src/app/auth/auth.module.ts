import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptorService } from '../services/token.interceptor.service';
import { UserService } from '../services/user.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],

  providers:[
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class AuthModule { }
