import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameSearchDialog } from './name-search-dialog';

describe('NameSearchDialog', () => {
  let component: NameSearchDialog;
  let fixture: ComponentFixture<NameSearchDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameSearchDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameSearchDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
