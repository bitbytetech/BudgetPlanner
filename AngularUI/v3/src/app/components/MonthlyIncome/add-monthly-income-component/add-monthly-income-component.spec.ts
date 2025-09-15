import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMonthlyIncomeComponent } from './add-monthly-income-component';

describe('AddMonthlyIncomeComponent', () => {
  let component: AddMonthlyIncomeComponent;
  let fixture: ComponentFixture<AddMonthlyIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMonthlyIncomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMonthlyIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
