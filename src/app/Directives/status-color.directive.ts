import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { screwdriver } from 'ngx-bootstrap-icons';

@Directive({
  selector: '[statusColor]'
})
export class StatusColorDirective implements OnInit{

  @Input() statusValue!: string;

  constructor(private element: ElementRef) { }

  ngOnInit(){
    switch(this.statusValue){
      case 'Przygotowywane':
        this.element.nativeElement.style.color = "#080750"
        this.element.nativeElement.style.fontWeight = "bold";
        break;
      case 'Gotowe':
        this.element.nativeElement.style.color = "#550000"
        this.element.nativeElement.style.fontWeight = "bold";
        break;
      case 'Zrealizowane':
        this.element.nativeElement.style.color = "#005cac"
        this.element.nativeElement.style.fontWeight = "bold";
        break;
    }
  }
}
