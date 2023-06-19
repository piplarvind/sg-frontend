import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { UpdateLeaderboardComponent } from '@app/leaderboard/update-leaderboard/update-leaderboard.component';

describe('UpdateLeaderboardComponent', () => {
  let component: UpdateLeaderboardComponent;
  let fixture: ComponentFixture<UpdateLeaderboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLeaderboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
