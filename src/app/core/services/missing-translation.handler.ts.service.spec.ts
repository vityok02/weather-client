import { TestBed } from '@angular/core/testing';

import { AppMissingTranslationHandler } from './missing-translation.handler.ts.service';

describe('MissingTranslationHandlerTsService', () => {
  let service: AppMissingTranslationHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppMissingTranslationHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
