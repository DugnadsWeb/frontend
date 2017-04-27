import { TestBed, inject } from '@angular/core/testing';
import { SalesActivityService } from './sales-activity.service';

describe('SalesActivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesActivityService]
    });
  });

  it('should ...', inject([SalesActivityService], (service: SalesActivityService) => {
    expect(service).toBeTruthy();
  }));
});
