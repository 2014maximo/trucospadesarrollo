import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiCategoryContentComponent } from './ai-category-content.component';

describe('AiCategoryContentComponent', () => {
  let component: AiCategoryContentComponent;
  let fixture: ComponentFixture<AiCategoryContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiCategoryContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiCategoryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
