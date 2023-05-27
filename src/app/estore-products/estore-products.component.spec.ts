import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoreProductsComponent } from './estore-products.component';

describe('EstoreProductsComponent', () => {
  let component: EstoreProductsComponent;
  let fixture: ComponentFixture<EstoreProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoreProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoreProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
