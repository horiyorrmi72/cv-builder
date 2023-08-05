import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EduComponent } from './edu.component';

describe('EduComponent', () => {
  let component: EduComponent;
  let fixture: ComponentFixture<EduComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EduComponent]
    });
    fixture = TestBed.createComponent(EduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
