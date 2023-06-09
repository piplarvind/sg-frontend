import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { AddMailComponent } from '@app/mail/add-mail/add-mail.component';

describe('AddMailComponent', () => {
  let component: AddMailComponent;
  let fixture: ComponentFixture<AddMailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
