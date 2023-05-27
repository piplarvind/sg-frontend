import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserEditComponent } from './register-user-edit.component';

describe('RegisterUserEditComponent', () => {
  let component: RegisterUserEditComponent;
  let fixture: ComponentFixture<RegisterUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterUserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
