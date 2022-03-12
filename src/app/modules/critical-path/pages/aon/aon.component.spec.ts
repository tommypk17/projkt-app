import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AonComponent } from './aon.component';

describe('AonComponent', () => {
  let component: AonComponent;
  let fixture: ComponentFixture<AonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
