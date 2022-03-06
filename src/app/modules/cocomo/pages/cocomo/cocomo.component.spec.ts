import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocomoComponent } from './cocomo.component';

describe('CocomoComponent', () => {
  let component: CocomoComponent;
  let fixture: ComponentFixture<CocomoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocomoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocomoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
