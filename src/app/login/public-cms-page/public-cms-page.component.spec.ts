import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCmsPageComponent } from './public-cms-page.component';

describe('PublicCmsPageComponent', () => {
  let component: PublicCmsPageComponent;
  let fixture: ComponentFixture<PublicCmsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicCmsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicCmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
