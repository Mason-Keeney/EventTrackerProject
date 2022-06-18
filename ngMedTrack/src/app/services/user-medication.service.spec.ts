import { TestBed } from '@angular/core/testing';

import { UserMedicationService } from './user-medication.service';

describe('UserMedicationService', () => {
  let service: UserMedicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMedicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
