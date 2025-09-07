import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameDataRow } from './name-data-row';

describe('NameDataRow', () => {
  let component: NameDataRow;
  let fixture: ComponentFixture<NameDataRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameDataRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameDataRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
