import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCategoryComponent } from './angular-category.component';

describe('AngularCategoryComponent', () => {
  let component: AngularCategoryComponent;
  let fixture: ComponentFixture<AngularCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
