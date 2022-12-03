import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayReservationsTableComponent } from './today-reservations-table.component';

describe('TodayReservationsTableComponent', () => {
  let component: TodayReservationsTableComponent;
  let fixture: ComponentFixture<TodayReservationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayReservationsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayReservationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
