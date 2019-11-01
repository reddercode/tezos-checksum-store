import { TestBed } from '@angular/core/testing';

import { LogsResolverService } from './logs-resolver.service';

describe('LogsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogsResolverService = TestBed.get(LogsResolverService);
    expect(service).toBeTruthy();
  });
});
