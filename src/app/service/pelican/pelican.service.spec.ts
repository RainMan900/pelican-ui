import { TestBed } from '@angular/core/testing';

import { PelicanService } from './pelican.service';

describe('PelicanService', () => {
  let service: PelicanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PelicanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
