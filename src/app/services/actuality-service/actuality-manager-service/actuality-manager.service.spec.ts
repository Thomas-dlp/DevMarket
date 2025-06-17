import { TestBed } from '@angular/core/testing';

import { ActualityManagerService } from './actuality-manager.service';

describe('ActualityManagerService', () => {
  let service: ActualityManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualityManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
