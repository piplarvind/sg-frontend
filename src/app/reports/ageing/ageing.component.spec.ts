import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { AgeingComponent } from '@app/reports/ageing/ageing.component';

describe('AgeingComponent', () => {
  let component: AgeingComponent;
  let fixture: ComponentFixture<AgeingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
