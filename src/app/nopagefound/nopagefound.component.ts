import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['nopagefound.component.scss']
})
export class NopagefoundComponent{
  year=new Date().getFullYear();

  constructor() { }

}
