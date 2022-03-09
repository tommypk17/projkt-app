import { TestBed } from '@angular/core/testing';

import { CocomoService } from './cocomo.service';

describe('CocomoService', () => {
  let service: CocomoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CocomoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
