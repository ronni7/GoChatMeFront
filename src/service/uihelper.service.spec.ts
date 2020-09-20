import { TestBed } from '@angular/core/testing';

import { UIHelperService } from './uihelper.service';

describe('UIHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UIHelperService = TestBed.get(UIHelperService);
    expect(service).toBeTruthy();
  });
});
