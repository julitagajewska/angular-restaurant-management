import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayReservationsComponent } from './today-reservations.component';

describe('TodayReservationsComponent', () => {
  let component: TodayReservationsComponent;
  let fixture: ComponentFixture<TodayReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayReservationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
