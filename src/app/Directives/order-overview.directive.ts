import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { OrderedProduct } from '../Models/ordered-product';

@Directive({
  selector: '[appOrderOverview]'
})
export class OrderOverviewDirective implements OnInit {

  @Input() orderedProduct!: OrderedProduct[];

  constructor(private element: ElementRef) { }

  ngOnInit(): void {

  }

}
