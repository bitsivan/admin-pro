import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuItems:any[]=[];
  public img='';
  public user: User;
  constructor(private sidebarServiec: SidebarService,
              private userservice: UserService) {
    this.menuItems=this.sidebarServiec.menu;
    this.img=userservice.user.imageUrl;
    this.user = userservice.user;
    console.log(this.menuItems);
   }

  ngOnInit(): void {
  }

}
