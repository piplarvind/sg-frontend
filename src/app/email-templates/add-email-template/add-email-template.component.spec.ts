import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { AddEmailTemplateComponent } from '@app/email-templates/add-email-template/add-email-template.component';

describe('AddEmailTemplateComponent', () => {
  let component: AddEmailTemplateComponent;
  let fixture: ComponentFixture<AddEmailTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmailTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

