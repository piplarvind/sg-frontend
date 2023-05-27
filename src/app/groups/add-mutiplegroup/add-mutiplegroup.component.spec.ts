import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMutiplegroupComponent } from './add-mutiplegroup.component';

describe('AddMutiplegroupComponent', () => {
  let component: AddMutiplegroupComponent;
  let fixture: ComponentFixture<AddMutiplegroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMutiplegroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMutiplegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
