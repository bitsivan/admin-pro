import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formSubmitted=false;
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {
    this.registerForm=this.fb.group({
      name: ['Ivan', Validators.required],
      email:['ivan@gmail.com', [Validators.required, Validators.email]],
      password:['', Validators.required],
      password2:['', Validators.required],
      terminos:[false, Validators.required],
    },{
      Validators: this.passwordsEqual('password', 'password2')
    })
  }

  ngOnInit(): void {
  }


  createUser(){
    console.log(this.registerForm.value);
    this.formSubmitted=true;

    if(this.registerForm.invalid){
      return;
    }

    //Save
    this.userService.createUser(this.registerForm.value)
    .subscribe(resp=>{
      console.log(resp);
      this.router.navigateByUrl('/');
    },(err)=>{
      //Swal.fire('Error', err, 'error');
    });
  }

  fieldNotValid(field: string): Boolean{
    if(this.registerForm.get(field)?.invalid && this.formSubmitted){
      return true;
    }else return false;
  }

  acceptTerms(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  verifyPasswords(){
    const pass1=this.registerForm.get('password')?.value;
    const pass2=this.registerForm.get('password2')?.value;
    if(pass1!==pass2 && this.formSubmitted)
      return true;
    else
      return false;
  }

  passwordsEqual(pass1: string, pass2: string){
    return (formGroup: FormGroup)=>{
      const pass1Control=formGroup.get(pass1);
      const pass2Control=formGroup.get(pass2);

      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({notEqual: true})
      }

    }
  }
}
