import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiCategoryHeaderComponent } from './ai-category-header.component';

describe('AiCategoryHeaderComponent', () => {
  let component: AiCategoryHeaderComponent;
  let fixture: ComponentFixture<AiCategoryHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiCategoryHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiCategoryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
