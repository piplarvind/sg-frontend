import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { AddSportComponent } from '@app/sports/add-sport/add-sport.component';

describe('AddSportComponent', () => {
  let component: AddSportComponent;
  let fixture: ComponentFixture<AddSportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

