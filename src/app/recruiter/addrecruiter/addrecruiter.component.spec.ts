import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { AddrecruiterComponent } from './addrecruiter.component';

describe('AddrecruiterComponent', () => {
  let component: AddrecruiterComponent;
  let fixture: ComponentFixture<AddrecruiterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrecruiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
