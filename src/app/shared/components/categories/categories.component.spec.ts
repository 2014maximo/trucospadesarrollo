import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose chunked categories of max 5 per row', () => {
    expect(component.chunkedCategories).toBeTruthy();
    for (const row of component.chunkedCategories) {
      expect(row.length).toBeLessThanOrEqual(5);
    }
  });

  it('should only include active categories in chunks', () => {
    const allSlugs = component.chunkedCategories.flat().map(c => c.state);
    expect(allSlugs.every(s => s === 'active')).toBeTrue();
  });
});
