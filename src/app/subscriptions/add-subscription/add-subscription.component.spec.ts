import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubscriptionComponent } from '@app/subscriptions/add-subscription/add-subscription.component';

describe('AddSubscriptionComponent', () => {
  let component: AddSubscriptionComponent;
  let fixture: ComponentFixture<AddSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
