import { TestBed } from '@angular/core/testing';

import { MissingTranslationHandlerTsService } from './missing-translation.handler.ts.service';

describe('MissingTranslationHandlerTsService', () => {
  let service: MissingTranslationHandlerTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissingTranslationHandlerTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
