import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfileTypeComponent } from './add-profile-type.component';

describe('AddProfileTypeComponent', () => {
  let component: AddProfileTypeComponent;
  let fixture: ComponentFixture<AddProfileTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProfileTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfileTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
