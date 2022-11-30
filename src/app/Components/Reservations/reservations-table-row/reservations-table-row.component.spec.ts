import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsTableRowComponent } from './reservations-table-row.component';

describe('ReservationsTableRowComponent', () => {
  let component: ReservationsTableRowComponent;
  let fixture: ComponentFixture<ReservationsTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationsTableRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
