import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { AddClubComponent } from '@app/clubs/add-club/add-club.component';

describe('AddClubComponent', () => {
  let component: AddClubComponent;
  let fixture: ComponentFixture<AddClubComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
