import { TestBed } from '@angular/core/testing';

import { DonneesQuebecApiRquest } from './donnees-quebec-api-rquest';

describe('DonneesQuebecApiRquest', () => {
  let service: DonneesQuebecApiRquest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonneesQuebecApiRquest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
