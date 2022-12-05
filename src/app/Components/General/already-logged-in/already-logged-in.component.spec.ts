import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyLoggedInComponent } from './already-logged-in.component';

describe('AlreadyLoggedInComponent', () => {
  let component: AlreadyLoggedInComponent;
  let fixture: ComponentFixture<AlreadyLoggedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlreadyLoggedInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlreadyLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
