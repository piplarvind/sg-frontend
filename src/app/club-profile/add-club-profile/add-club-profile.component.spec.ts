import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClubProfileComponent } from './add-club-profile.component';

describe('AddClubProfileComponent', () => {
  let component: AddClubProfileComponent;
  let fixture: ComponentFixture<AddClubProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClubProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClubProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
