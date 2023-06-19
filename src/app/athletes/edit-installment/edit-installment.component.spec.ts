import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { EditInstallmentComponent } from './edit-installment.component';

describe('EditInstallmentComponent', () => {
  let component: EditInstallmentComponent;
  let fixture: ComponentFixture<EditInstallmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInstallmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstallmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
