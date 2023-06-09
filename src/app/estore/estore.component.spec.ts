import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { EstoreComponent } from './estore.component';

describe('EstoreComponent', () => {
  let component: EstoreComponent;
  let fixture: ComponentFixture<EstoreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
