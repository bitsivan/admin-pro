import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  //public linkTheme=<HTMLLinkElement>document.querySelector('#theme');
  //public links:NodeListOf<Element>=document.querySelectorAll('.selector');

  constructor(private settings: SettingsService) { }

  ngOnInit(): void {
    this.settings.checkCurrentTheme();
  }

  changeTheme(theme:string){
    this.settings.changeTheme(theme);
  }

}
