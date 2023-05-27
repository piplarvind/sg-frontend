import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulltransComponent } from './successfulltrans.component';

describe('SuccessfulltransComponent', () => {
  let component: SuccessfulltransComponent;
  let fixture: ComponentFixture<SuccessfulltransComponent>;

  beforeEach(async(() => {
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
