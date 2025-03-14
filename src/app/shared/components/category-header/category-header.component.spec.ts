import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryHeaderComponent } from './category-header.component';

describe('CategoryHeaderComponent', () => {
  let component: CategoryHeaderComponent;
  let fixture: ComponentFixture<CategoryHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
