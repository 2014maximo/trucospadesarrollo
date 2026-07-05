import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-bs-theme');
    document.documentElement.removeAttribute('data-theme');

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-bs-theme');
    document.documentElement.removeAttribute('data-theme');
  });

  it('inicia en modo dark por defecto (sin valor en localStorage)', () => {
    expect(service.theme()).toBe('dark');
    expect(service.isDark).toBe(true);
  });

  it('setTheme cambia el tema activo', () => {
    service.setTheme('light');
    expect(service.theme()).toBe('light');
    expect(service.isDark).toBe(false);

    service.setTheme('dark');
    expect(service.theme()).toBe('dark');
    expect(service.isDark).toBe(true);
  });

  it('toggle alterna entre light y dark', () => {
    expect(service.theme()).toBe('dark');
    service.toggle();
    expect(service.theme()).toBe('light');
    service.toggle();
    expect(service.theme()).toBe('dark');
  });

  it('persiste el tema en localStorage', () => {
    service.setTheme('light');
    expect(localStorage.getItem('theme')).toBe('light');

    service.setTheme('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('refleja el tema en el atributo data-bs-theme del <html>', () => {
    service.setTheme('light');
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    service.setTheme('dark');
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('lee el tema guardado en localStorage al inicializar', () => {
    localStorage.setItem('theme', 'light');

    TestBed.resetTestingModule();
    const nuevo = TestBed.inject(ThemeService);

    expect(nuevo.theme()).toBe('light');
  });

  it('ignora valores inválidos en localStorage y cae a dark', () => {
    localStorage.setItem('theme', 'purple');

    TestBed.resetTestingModule();
    const nuevo = TestBed.inject(ThemeService);

    expect(nuevo.theme()).toBe('dark');
  });
});