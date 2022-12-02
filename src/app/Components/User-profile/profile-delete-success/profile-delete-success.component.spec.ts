import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDeleteSuccessComponent } from './profile-delete-success.component';

describe('ProfileDeleteSuccessComponent', () => {
  let component: ProfileDeleteSuccessComponent;
  let fixture: ComponentFixture<ProfileDeleteSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDeleteSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDeleteSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
