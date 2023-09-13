import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalPathGraphComponent } from './critical-path-graph.component';

describe('CriticalPathGraphComponent', () => {
  let component: CriticalPathGraphComponent;
  let fixture: ComponentFixture<CriticalPathGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriticalPathGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalPathGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
