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
        this.element.nativeElement.style.color = "#D89E1F"
        this.element.nativeElement.style.fontWeight = "bold";
        break;
      case 'Gotowe':
        this.element.nativeElement.style.color = "#89C726"
        this.element.nativeElement.style.fontWeight = "bold";
        break;
      case 'Zrealizowane':
        this.element.nativeElement.style.color = "#1CA4C2"
        this.element.nativeElement.style.fontWeight = "bold";
        break;
    }
  }
}
