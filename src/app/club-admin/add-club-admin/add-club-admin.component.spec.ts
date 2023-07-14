import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClubAdminComponent } from './add-club-admin.component';

describe('AddClubAdminComponent', () => {
  let component: AddClubAdminComponent;
  let fixture: ComponentFixture<AddClubAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClubAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClubAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
