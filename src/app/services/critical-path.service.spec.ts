import { TestBed } from '@angular/core/testing';

import { CriticalPathService } from './critical-path.service';

describe('CriticalPathService', () => {
  let service: CriticalPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriticalPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
