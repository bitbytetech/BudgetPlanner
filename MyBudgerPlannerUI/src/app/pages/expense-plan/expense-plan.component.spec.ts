import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePlanComponent } from './expense-plan.component';

describe('ExpensePlanComponent', () => {
  let component: ExpensePlanComponent;
  let fixture: ComponentFixture<ExpensePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensePlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
