import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { RecruiterComponent } from './recruiter.component';

describe('RecruiterComponent', () => {
  let component: RecruiterComponent;
  let fixture: ComponentFixture<RecruiterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
