import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoreBrandComponent } from './estore-brand.component';

describe('EstoreBrandComponent', () => {
  let component: EstoreBrandComponent;
  let fixture: ComponentFixture<EstoreBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoreBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoreBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
