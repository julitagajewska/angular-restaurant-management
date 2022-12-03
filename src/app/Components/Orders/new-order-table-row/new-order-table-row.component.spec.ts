import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderTableRowComponent } from './new-order-table-row.component';

describe('NewOrderTableRowComponent', () => {
  let component: NewOrderTableRowComponent;
  let fixture: ComponentFixture<NewOrderTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOrderTableRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOrderTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
