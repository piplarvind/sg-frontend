import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRepeatedDialogComponent } from './event-repeated-dialog.component';

describe('EventRepeatedDialogComponent', () => {
  let component: EventRepeatedDialogComponent;
  let fixture: ComponentFixture<EventRepeatedDialogComponent>;

  beforeEach(async(() => {
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
