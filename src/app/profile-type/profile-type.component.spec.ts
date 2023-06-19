import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { ProfileTypeComponent } from './profile-type.component';

describe('ProfileTypeComponent', () => {
  let component: ProfileTypeComponent;
  let fixture: ComponentFixture<ProfileTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
