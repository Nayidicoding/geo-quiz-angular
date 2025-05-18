import { TestBed } from '@angular/core/testing';

import { GeoQuizService } from './geo-quiz.service';

describe('GeoQuizService', () => {
  let service: GeoQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
