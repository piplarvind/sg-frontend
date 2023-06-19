import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { EstoreTransactionComponent } from './estore-transaction.component';

describe('EstoreTransactionComponent', () => {
  let component: EstoreTransactionComponent;
  let fixture: ComponentFixture<EstoreTransactionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoreTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoreTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
