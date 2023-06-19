import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { TrainingAssignComponent } from '@app/training-assign/training-assign.component';

describe('TrainingAssignComponent', () => {
  let component: TrainingAssignComponent;
  let fixture: ComponentFixture<TrainingAssignComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
