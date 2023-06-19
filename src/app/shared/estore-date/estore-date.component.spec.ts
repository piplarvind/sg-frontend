import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { EstoreDateComponent } from './estore-date.component';

describe('EstoreDateComponent', () => {
  let component: EstoreDateComponent;
  let fixture: ComponentFixture<EstoreDateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoreDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoreDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
