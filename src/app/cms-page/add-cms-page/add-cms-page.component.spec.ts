import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCmsPageComponent } from './add-cms-page.component';

describe('AddCmsPageComponent', () => {
  let component: AddCmsPageComponent;
  let fixture: ComponentFixture<AddCmsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCmsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
