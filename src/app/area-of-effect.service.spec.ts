import { TestBed, inject } from '@angular/core/testing';

import { AreaOfEffectService } from './area-of-effect.service';

describe('AreaOfEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaOfEffectService]
    });
  });

  it('should be created', inject([AreaOfEffectService], (service: AreaOfEffectService) => {
    expect(service).toBeTruthy();
  }));
});
