import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayReservationsRowComponent } from './today-reservations-row.component';

describe('TodayReservationsRowComponent', () => {
  let component: TodayReservationsRowComponent;
  let fixture: ComponentFixture<TodayReservationsRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayReservationsRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayReservationsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
