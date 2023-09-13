import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalPathFormComponent } from './critical-path-form.component';

describe('CriticalPathFormComponent', () => {
  let component: CriticalPathFormComponent;
  let fixture: ComponentFixture<CriticalPathFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriticalPathFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriticalPathFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
