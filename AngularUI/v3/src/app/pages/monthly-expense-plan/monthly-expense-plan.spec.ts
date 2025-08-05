import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyExpensePlan } from './monthly-expense-plan';

describe('MonthlyExpensePlan', () => {
  let component: MonthlyExpensePlan;
  let fixture: ComponentFixture<MonthlyExpensePlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyExpensePlan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyExpensePlan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
