import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameDataView } from './name-data-view';

describe('NameDataView', () => {
  let component: NameDataView;
  let fixture: ComponentFixture<NameDataView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameDataView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameDataView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
