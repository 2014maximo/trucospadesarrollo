import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CategoriesComponent } from './categories.component';
import { ThemeService } from '../../services/theme.service';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesComponent, TranslateModule.forRoot()],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    themeService.setTheme('dark');
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

  it('should build pasoDeIndice from CATEGORIES', () => {
    expect(component.pasoDeIndice.length).toBe(component.categories.length);
  });

  it('should map active state to activo in pasoDeIndice', () => {
    const activos = component.pasoDeIndice.filter(i => i.estado === 'activo');
    const activosConstant = component.categories.filter(c => c.state === 'active');
    expect(activos.length).toBe(activosConstant.length);
  });

  it('should uppercase nameCategorie into nombre', () => {
    for (const item of component.pasoDeIndice) {
      expect(item.nombre).toBe(item.nombre.toUpperCase());
    }
  });

  it('iconoCategoria devuelve iconLight en modo dark', () => {
    const ai = component.categories.find(c => c.nameCategorie === 'ai')!;
    expect(component.iconoCategoria(ai)).toBe(ai.iconLight);
  });

  it('iconoCategoria devuelve iconDark en modo light', () => {
    themeService.setTheme('light');
    const ai = component.categories.find(c => c.nameCategorie === 'ai')!;
    expect(component.iconoCategoria(ai)).toBe(ai.iconDark);
  });
});