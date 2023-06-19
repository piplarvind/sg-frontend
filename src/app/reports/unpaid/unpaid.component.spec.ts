import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { UnpaidComponent } from '@app/reports/unpaid/unpaid.component';

describe('UnpaidComponent', () => {
  let component: UnpaidComponent;
  let fixture: ComponentFixture<UnpaidComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
