import { TestBed, inject } from '@angular/core/testing';

import { DugnadService } from './dugnad.service';

describe('DugnadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DugnadService]
    });
  });

  it('should ...', inject([DugnadService], (service: DugnadService) => {
    expect(service).toBeTruthy();
  }));
});
