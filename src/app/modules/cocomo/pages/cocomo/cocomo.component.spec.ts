import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocomoComponent } from './cocomo.component';
import {CocomoService} from "../../../../services/cocomo.service";
import {MessageService} from "primeng/api";
import {CocomoModule} from "../../cocomo.module";
import {AppModule} from "../../../../app.module";

describe('CocomoComponent', () => {
  let component: CocomoComponent;
  let fixture: ComponentFixture<CocomoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocomoComponent ],
      providers: [CocomoService, MessageService],
      imports: [AppModule, CocomoModule]
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
