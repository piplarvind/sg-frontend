import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { SuccessfulltransComponent } from './successfulltrans.component';

describe('SuccessfulltransComponent', () => {
  let component: SuccessfulltransComponent;
  let fixture: ComponentFixture<SuccessfulltransComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulltransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulltransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
