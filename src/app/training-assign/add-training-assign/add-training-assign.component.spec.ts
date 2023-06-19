import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { AddTrainingAssignComponent } from '@app/training-assign/add-training-assign/add-training-assign.component';

describe('AddTrainingAssignComponent', () => {
  let component: AddTrainingAssignComponent;
  let fixture: ComponentFixture<AddTrainingAssignComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrainingAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainingAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
