import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';

import { AddSettingComponent } from '@app/setting/add-setting/add-setting.component';

describe('AddSettingComponent', () => {
  let component: AddSettingComponent;
  let fixture: ComponentFixture<AddSettingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
