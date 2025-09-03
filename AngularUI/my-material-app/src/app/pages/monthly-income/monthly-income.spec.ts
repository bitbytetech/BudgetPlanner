import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyIncome } from './monthly-income';

describe('MonthlyIncome', () => {
  let component: MonthlyIncome;
  let fixture: ComponentFixture<MonthlyIncome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyIncome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyIncome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
