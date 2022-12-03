import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTableRowComponent } from './orders-table-row.component';

describe('OrdersTableRowComponent', () => {
  let component: OrdersTableRowComponent;
  let fixture: ComponentFixture<OrdersTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersTableRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
