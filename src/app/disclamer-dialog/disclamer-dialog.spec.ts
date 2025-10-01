import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclamerDialog } from './disclamer-dialog';

describe('DisclamerDialog', () => {
  let component: DisclamerDialog;
  let fixture: ComponentFixture<DisclamerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisclamerDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisclamerDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
