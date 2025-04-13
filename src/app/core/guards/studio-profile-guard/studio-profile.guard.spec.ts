import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { studioProfileGuard } from './studio-profile.guard';

describe('studioProfileGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => studioProfileGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
