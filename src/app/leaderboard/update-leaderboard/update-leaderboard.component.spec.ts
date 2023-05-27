import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeaderboardComponent } from '@app/leaderboard/update-leaderboard/update-leaderboard.component';

describe('UpdateLeaderboardComponent', () => {
  let component: UpdateLeaderboardComponent;
  let fixture: ComponentFixture<UpdateLeaderboardComponent>;

  beforeEach(async(() => {
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
