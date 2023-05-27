import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfflinePaymentComponent } from './add-offline-payment.component';

describe('AddOfflinePaymentComponent', () => {
  let component: AddOfflinePaymentComponent;
  let fixture: ComponentFixture<AddOfflinePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOfflinePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOfflinePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
