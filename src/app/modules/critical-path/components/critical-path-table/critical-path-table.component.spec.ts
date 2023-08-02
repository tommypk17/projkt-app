import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalPathTableComponent } from './critical-path-table.component';

describe('CriticalPathTableComponent', () => {
  let component: CriticalPathTableComponent;
  let fixture: ComponentFixture<CriticalPathTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriticalPathTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriticalPathTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
