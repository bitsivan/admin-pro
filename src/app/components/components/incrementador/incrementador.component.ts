import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  @Input() progress:number=40;
  @Input() btnClass:string='btn-primary';
  @Output() valorSalida:EventEmitter<number>=new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.btnClass=`btn ${this.btnClass}`;
  }

  changeValue(value: number){
    if(this.progress>=100 && value==0){
      this.valorSalida.emit(100);
      this.progress=100;
    }

    if(this.progress<=0 && value<0){
      this.valorSalida.emit(0);
      this.progress=0;
    }

    this.progress=this.progress+value;
    this.valorSalida.emit(this.progress);
  }

  onChange(value:number){
    if(value>=100){
      this.progress=100;
    }else if(value<=0){
      this.progress=0;
    }else{
      this.progress=value;
    }

    this.valorSalida.emit(this.progress);
  }

}
