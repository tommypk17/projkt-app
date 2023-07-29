import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalPathNodeComponent } from './critical-path-node.component';

describe('CriticalPathNodeComponent', () => {
  let component: CriticalPathNodeComponent;
  let fixture: ComponentFixture<CriticalPathNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriticalPathNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalPathNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
