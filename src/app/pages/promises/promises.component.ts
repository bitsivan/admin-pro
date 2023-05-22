import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, from, Observable, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.scss']
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const promise=new Promise((resolve, reject)=>{
      if(true){
        resolve('Hello world!!')
      }else{
        reject('Something was wrong!')
      }
    })

    promise.then((message)=>{
      console.log(message)
    })
    .catch(error=> console.log('error promise', error));

    console.log('Fin Init');

    this.getUsers().then(users=>console.log(users));

    var promiseTest= new Promise((resolve, reject)=>{
      reject('error');
    })

    promiseTest.then((result)=>{
      console.log(result)
    }, (error)=>{
      console.log(error);
    });

  }

  getUsers(){
    return new Promise( resolve =>{
      fetch('https://reqres.in/api/users?page=2')
      .then(resp => resp.json())
      .then(body => resolve(body.data));
    });
  }

}
