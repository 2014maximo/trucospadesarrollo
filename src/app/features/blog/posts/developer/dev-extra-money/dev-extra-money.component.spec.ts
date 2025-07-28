import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevExtraMoneyComponent } from './dev-extra-money.component';

describe('DevExtraMoneyComponent', () => {
  let component: DevExtraMoneyComponent;
  let fixture: ComponentFixture<DevExtraMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevExtraMoneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevExtraMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
