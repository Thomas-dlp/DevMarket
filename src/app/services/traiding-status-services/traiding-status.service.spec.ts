import { TestBed } from '@angular/core/testing';

import { TraidingStatusService } from './traiding-status.service';

describe('TraidingStatusService', () => {
  let service: TraidingStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraidingStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
