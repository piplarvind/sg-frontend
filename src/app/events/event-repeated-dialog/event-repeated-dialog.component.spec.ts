import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { EventRepeatedDialogComponent } from './event-repeated-dialog.component';

describe('EventRepeatedDialogComponent', () => {
  let component: EventRepeatedDialogComponent;
  let fixture: ComponentFixture<EventRepeatedDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventRepeatedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRepeatedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
