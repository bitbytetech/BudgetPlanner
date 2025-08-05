import { TestBed } from '@angular/core/testing';

import { UserRegistrationServiceTsService } from './user-registration.service.ts.service';

describe('UserRegistrationServiceTsService', () => {
  let service: UserRegistrationServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegistrationServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
