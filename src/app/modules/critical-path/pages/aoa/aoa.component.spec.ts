import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoaComponent } from './aoa.component';

describe('AoaComponent', () => {
  let component: AoaComponent;
  let fixture: ComponentFixture<AoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
