import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiCategoryComponent } from './ai-category.component';

describe('AiCategoryComponent', () => {
  let component: AiCategoryComponent;
  let fixture: ComponentFixture<AiCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
