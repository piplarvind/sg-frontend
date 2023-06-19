import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { AddparentComponent } from './addparent.component';

describe('AddparentComponent', () => {
  let component: AddparentComponent;
  let fixture: ComponentFixture<AddparentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddparentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
