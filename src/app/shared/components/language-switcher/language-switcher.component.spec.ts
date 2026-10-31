import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from './language-switcher.component';

describe('LanguageSwitcherComponent', () => {
  let fixture: ComponentFixture<LanguageSwitcherComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    localStorage.setItem('idioma', 'es');
    await TestBed.configureTestingModule({
      imports: [LanguageSwitcherComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    fixture.detectChanges();
    host = fixture.nativeElement;
  });

  afterEach(() => localStorage.removeItem('idioma'));

  it('usa un botón con nombre accesible para abrir el menú', () => {
    const toggle = host.querySelector<HTMLButtonElement>('.dropdown-toggle');
    expect(toggle?.tagName).toBe('BUTTON');
    expect(toggle?.getAttribute('aria-label')).toContain('Español');
  });

  it('ofrece los otros idiomas como botones con su nombre y su atributo lang', () => {
    const opciones = Array.from(host.querySelectorAll<HTMLButtonElement>('.dropdown-item'));
    expect(opciones.map(o => o.tagName)).toEqual(['BUTTON', 'BUTTON']);
    expect(opciones.map(o => o.textContent?.trim())).toEqual(['English', 'Français']);
    expect(opciones.map(o => o.lang)).toEqual(['en', 'fr']);
  });

  it('cambia de idioma al activar una opción', () => {
    host.querySelector<HTMLButtonElement>('.dropdown-item[lang="fr"]')!.click();
    fixture.detectChanges();
    expect(localStorage.getItem('idioma')).toBe('fr');
    expect(document.activeElement).toBe(host.querySelector('.dropdown-toggle'));
    expect(Array.from(host.querySelectorAll('.dropdown-item')).map(o => o.textContent?.trim())).toEqual(['Español', 'English']);
  });
});
