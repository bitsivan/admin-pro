import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { retry, take, map, filter } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnDestroy{

  intervalSubs: Subscription;

  constructor() {
    this.returnObservable();
    this.intervalSubs=this.retornalInterval()
      .subscribe(
        console.log
      )
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  returnObservable(): Observable<number>{
    let i=-1;

    const obs$ = new Observable<number>(observer =>{
      const intervalo = setInterval(()=>{
        i++;
        observer.next(i);

        if(i===4){
          clearInterval(intervalo);
          observer.complete();
        }

        if (i==3){
          clearInterval(intervalo);
          i=0;
          observer.error('Throw error');
        }
      }, 1000)
    });

    obs$.pipe(
     //retry(1)
    ).subscribe(
      valor=> console.log('Subs:', valor),
      err=> console.log(err),
      ()=> console.info('Obs finished')
    );
    return obs$
  }

  retornalInterval(): Observable<number>{
    return interval(1000).pipe(
      take(10),
      map(valor=>valor+1),
      filter(
        value=>(value%2===0)? true : false
      )
    );
  }

}
