import { TestBed, inject } from '@angular/core/testing';

import { CharacterSheetService } from './character-sheet.service';

describe('CharacterSheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharacterSheetService]
    });
  });

  it('should be created', inject([CharacterSheetService], (service: CharacterSheetService) => {
    expect(service).toBeTruthy();
  }));
});
