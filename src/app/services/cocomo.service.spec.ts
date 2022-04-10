import { TestBed } from '@angular/core/testing';

import { CocomoService } from './cocomo.service';
import {AppModule} from "../app.module";

describe('CocomoService', () => {
  let service: CocomoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    service = TestBed.inject(CocomoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
