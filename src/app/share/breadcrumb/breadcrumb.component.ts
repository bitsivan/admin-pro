import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: [
  ]
})
export class BreadcrumbComponent implements OnInit {
  public titulo: string = '';
  public titleSubs$: Subscription;
  constructor(private router: Router) {
    this.titleSubs$ = this.getRouteData().subscribe(({ title }) => {
      this.titulo = title;
      document.title = `AdminPro - ${title}`;
    });
  }

  ngOnInit(): void {
  }

  getRouteData(){
    return this.router.events.pipe(
      filter<any>(event => event instanceof ActivationEnd),
      filter((event:ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd)=> event.snapshot.data),
    );
  }
}
