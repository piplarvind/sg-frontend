import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { AddCoachComponent } from '@app/coach/add-coach/add-coach.component';

describe('AddCoachComponent', () => {
  let component: AddCoachComponent;
  let fixture: ComponentFixture<AddCoachComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
