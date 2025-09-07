import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameDataTable } from './name-data-table';

describe('NameDataTable', () => {
  let component: NameDataTable;
  let fixture: ComponentFixture<NameDataTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameDataTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameDataTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
