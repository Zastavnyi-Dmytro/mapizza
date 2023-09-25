import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCabinetComponent } from './user-cabinet.component';

describe('UserCabinetComponent', () => {
  let component: UserCabinetComponent;
  let fixture: ComponentFixture<UserCabinetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCabinetComponent]
    });
    fixture = TestBed.createComponent(UserCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
