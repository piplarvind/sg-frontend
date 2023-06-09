import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { AddEventtypeComponent } from './add-eventtype.component';

describe('AddEventtypeComponent', () => {
  let component: AddEventtypeComponent;
  let fixture: ComponentFixture<AddEventtypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
