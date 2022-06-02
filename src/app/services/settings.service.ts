import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme=<HTMLLinkElement>document.querySelector('#theme');
  themeDefault='./assets/css/colors/purple-dark.css';

  constructor() {
    console.log('Settings Service init');
    this.setTheme();
   }


   setTheme(){
    const currentTheme=localStorage.getItem('theme');
    if(currentTheme){
      this.linkTheme.setAttribute('href',currentTheme);
    }else{
      this.linkTheme.setAttribute('href',this.themeDefault);
    }
  }

  changeTheme(theme:string){
    console.log(theme);
    const url=`./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme',url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    const links=document.querySelectorAll('.selector');
    links.forEach(ele=>{
      ele.classList.remove('working');
      const btnElem=ele.getAttribute('data-theme');
      const btnElemUrl=`./assets/css/colors/${btnElem}.css`;
      const currentTheme=this.linkTheme.getAttribute('href');
      if(btnElemUrl===currentTheme){
        ele.classList.add('working');
      }
    });
  }
}
