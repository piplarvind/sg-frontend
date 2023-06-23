import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBarChartComponent } from './payment-bar-chart.component';

describe('PaymentBarChartComponent', () => {
  let component: PaymentBarChartComponent;
  let fixture: ComponentFixture<PaymentBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
