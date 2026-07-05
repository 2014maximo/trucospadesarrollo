import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPostSupplementComponent } from './header-post-supplement.component';
import { ThemeService } from '../../services/theme.service';

describe('HeaderPostSupplementComponent', () => {
  let component: HeaderPostSupplementComponent;
  let fixture: ComponentFixture<HeaderPostSupplementComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPostSupplementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPostSupplementComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    themeService.setTheme('dark');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('en modo dark usa iconLight de la categoría (developer)', () => {
    fixture.componentRef.setInput('categoria', 'developer');
    fixture.detectChanges();

    // developer comparte iconDark/iconLight en CATEGORIES: 'assets/img/categorias/developer.png'
    expect(component.rutaIcono()).toBe('assets/img/categorias/developer.png');
  });

  it('en modo dark usa iconLight para ai (ia-white.png)', () => {
    fixture.componentRef.setInput('categoria', 'ai');
    fixture.detectChanges();

    expect(component.rutaIcono()).toBe('assets/img/categorias/ia-white.png');
  });

  it('al cambiar a modo light usa iconDark (ai-dark.png)', () => {
    fixture.componentRef.setInput('categoria', 'ai');
    themeService.setTheme('light');
    fixture.detectChanges();

    expect(component.rutaIcono()).toBe('assets/img/categorias/ia-dark.png');
  });

  it('resuelve de forma insensible a mayúsculas', () => {
    fixture.componentRef.setInput('categoria', 'Angular');
    fixture.detectChanges();

    expect(component.rutaIcono()).toBe('assets/img/categorias/angular.png');
  });

  it('con categoría vacía devuelve cadena vacía (no renderiza <img>)', () => {
    fixture.componentRef.setInput('categoria', '');
    fixture.detectChanges();

    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeNull();
    expect(component.rutaIcono()).toBe('');
  });

  it('con categoría desconocida usa fallback por convención', () => {
    themeService.setTheme('dark');
    fixture.componentRef.setInput('categoria', 'categoria-inexistente');
    fixture.detectChanges();

    expect(component.rutaIcono()).toBe('assets/img/categorias/categoria-inexistente-white.png');
  });
});