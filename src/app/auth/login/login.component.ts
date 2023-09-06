import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn: ElementRef | undefined;

  public loginForm=this.fb.group({
    email:[localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password:['123459', Validators.required],
    remember: [false]
  })
  constructor(private router:Router,
            private fb: FormBuilder,
            private userService: UserService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "840799055853-54hsck3n9aj1dfmat0ru5q8dl5qspvlh.apps.googleusercontent.com",
      callback: (response:any)=>this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      this.googleBtn?.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also
  }

  handleCredentialResponse(response: any){
   console.log("Encoded JWT ID token: " + response.credential);
   this.userService.loginGoogle(response.credential)
    .subscribe(resp=> {
      console.log({login: resp});
      this.router.navigateByUrl('/');
    });
  }

  login(){
    console.log('login test');
    //this.router.navigateByUrl('/');
    this.userService.login(this.loginForm.value)
      .subscribe(resp=>{
        if(this.loginForm.get('remember')?.value){
          localStorage.setItem('email', this.loginForm.get('email')?.value)
        }else{
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/');
      });
  }

}
