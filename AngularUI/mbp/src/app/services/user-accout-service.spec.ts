import { TestBed } from '@angular/core/testing';

import { UserAccoutService } from './user-accout-service';

describe('UserAccoutService', () => {
  let service: UserAccoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAccoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
