import { TestBed } from '@angular/core/testing';

import { EditmodalService } from './editmodal.service';

describe('EditmodalService', () => {
  let service: EditmodalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditmodalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
