import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { EualIosComponent } from './eual-ios.component';

describe('EualIosComponent', () => {
  let component: EualIosComponent;
  let fixture: ComponentFixture<EualIosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EualIosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EualIosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
