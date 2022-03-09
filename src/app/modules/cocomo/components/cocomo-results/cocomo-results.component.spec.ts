import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocomoResultsComponent } from './cocomo-results.component';

describe('CocomoResultsComponent', () => {
  let component: CocomoResultsComponent;
  let fixture: ComponentFixture<CocomoResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocomoResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocomoResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
