import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CategoriesComponent } from './categories.component';
import { CATEGORIES } from './constants/categories.constant';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesComponent, TranslateModule.forRoot()],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    host = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('muestra un libro por cada categoría activa y ninguna inactiva', () => {
    const activas = CATEGORIES.filter(c => c.state === 'active');
    expect(component.libros.map(l => l.ruta)).toEqual(activas.map(c => c.linkCategory));
    expect(host.querySelectorAll('a.est-libro').length).toBe(activas.length);
  });

  it('cada libro es un enlace a su categoría con nombre accesible', () => {
    const enlaces = Array.from(host.querySelectorAll<HTMLAnchorElement>('a.est-libro'));
    enlaces.forEach((enlace, i) => {
      expect(enlace.getAttribute('href')).toBe(component.libros[i].ruta);
      expect(enlace.getAttribute('aria-label')).toContain(component.libros[i].titulo);
    });
  });

  it('toma el título del final de la ruta y usa siempre el ícono claro', () => {
    const ia = component.libros.find(l => l.ruta === '/blog/ia')!;
    expect(ia.titulo).toBe('IA');
    expect(ia.icono).toBe(CATEGORIES.find(c => c.linkCategory === '/blog/ia')!.iconLight);
  });

  it('la decoración queda oculta para lectores de pantalla', () => {
    host.querySelectorAll('.est-deco, .est-sujetalibros').forEach(deco => {
      expect(deco.closest('[aria-hidden="true"]')).toBeTruthy();
    });
  });
});
