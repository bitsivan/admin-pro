import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  })
  public user: User;
  public file: File | undefined;
  public imgTemp: any = '';

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm.patchValue({
      name: this.userService.user.name,
      email: this.userService.user.email
    })
    console.log(this.userService.user);
  }

  updateProfile() {
    this.userService.updateUser(this.profileForm.value)
      .subscribe((resp) => {
        const {name, email} = this.profileForm.value;
        console.log(resp);
        this.user.name=name;
        this.user.email=email;
      })
  }

  changeImage (event: any){
      const _file = event.target.files[0];
      this.file=_file;

      if(!_file){
        this.imgTemp = null;
        return;
      }

      const reader=new FileReader();
      const url64=reader.readAsDataURL(_file);

      reader.onloadend=()=>{
        this.imgTemp=reader.result;
        console.log(reader.result);
      }
  }

  uploadImage(){
    this.fileUploadService.updatePicture('users', this.user.uid || '', this.file)
    .then( img => {
      console.log(img);
      this.user.img=img;
      Swal.fire('Success', 'Image updated.', 'success');
    }).catch(err=> {
      console.log(err);
      Swal.fire('Error', 'Error updating image', 'error');
    });
  }

}
