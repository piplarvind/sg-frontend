import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { EstoreOrdersComponent } from './estore-orders.component';

describe('EstoreOrdersComponent', () => {
  let component: EstoreOrdersComponent;
  let fixture: ComponentFixture<EstoreOrdersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoreOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoreOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
