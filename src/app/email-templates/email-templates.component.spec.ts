import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { EmailTemplatesComponent } from '@app/email-templates/sports.component';

describe('EmailTemplatesComponent', () => {
  let component: EmailTemplatesComponent;
  let fixture: ComponentFixture<EmailTemplatesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
