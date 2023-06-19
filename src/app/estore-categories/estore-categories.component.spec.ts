import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { EstoreCategoriesComponent } from './estore-categories.component';

describe('EstoreCategoriesComponent', () => {
  let component: EstoreCategoriesComponent;
  let fixture: ComponentFixture<EstoreCategoriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoreCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoreCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
