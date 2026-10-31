import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PhrasesComponent } from './phrases.component';
import { PHRASES } from './constants/phrases.constant';

describe('PhrasesComponent', () => {
  let component: PhrasesComponent;
  let fixture: ComponentFixture<PhrasesComponent>;
  let translate: TranslateService;

  const frases = [
    { frase: 'Hola mundo', autor: 'Uno', borde: '', colorText: '', id: 1 },
    { frase: 'Adiós', autor: 'Dos', borde: '', colorText: '', id: 2 },
    { frase: 'Tres palabras aquí', autor: 'Tres', borde: '', colorText: '', id: 3 }
  ];

  beforeEach(async () => {
    spyOn(window, 'matchMedia').and.returnValue({ matches: true } as MediaQueryList);
    await TestBed.configureTestingModule({
      imports: [PhrasesComponent, TranslateModule.forRoot()],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }]
    }).compileComponents();

    fixture = TestBed.createComponent(PhrasesComponent);
    component = fixture.componentInstance;
    translate = TestBed.inject(TranslateService);
    translate.setDefaultLang('es');
    translate.use('es');
    fixture.detectChanges();
  });

  function listo(): void {
    component.frases = [...frases];
    component.indice = 0;
    component.estado = 'listo';
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('carga todas las frases y pasa a listo', async () => {
    await component.procesarCargarFrases(true);
    expect(component.estado).toBe('listo');
    expect(component.frases.length).toBe(PHRASES.length);
  });

  it('con movimiento reducido empieza en pausa', () => {
    expect(component.pausado).toBeTrue();
  });

  it('divide la frase en palabras de tinta y muestra el autor', () => {
    listo();
    const host: HTMLElement = fixture.nativeElement;
    expect(Array.from(host.querySelectorAll('.tinta')).map(e => e.textContent)).toEqual(['Hola', 'mundo']);
    expect(host.querySelector('.autor')?.textContent).toBe('Uno');
  });

  it('siguiente y anterior recorren las frases de forma circular', async () => {
    listo();
    await component.siguiente();
    expect(component.indice).toBe(1);
    await component.anterior();
    await component.anterior();
    expect(component.indice).toBe(2);
  });

  it('el contador muestra la posición con dos cifras y un nombre accesible', () => {
    listo();
    const contador: HTMLElement = fixture.nativeElement.querySelector('.contador');
    expect(contador.textContent?.replace(/\s+/g, ' ').trim()).toBe('01 / 03');
    expect(contador.getAttribute('aria-label')).toBeTruthy();
  });

  it('el botón de pausa alterna el estado y su nombre', () => {
    listo();
    const boton: HTMLButtonElement = fixture.nativeElement.querySelectorAll('.control')[1];
    expect(boton.getAttribute('aria-label')).toBe('PHRASES.reanudar');
    boton.click();
    fixture.detectChanges();
    expect(component.pausado).toBeFalse();
    expect(boton.getAttribute('aria-label')).toBe('PHRASES.pausar');
  });

  it('solo anuncia cambios a lectores de pantalla cuando está en pausa', () => {
    listo();
    const pergamino: HTMLElement = fixture.nativeElement.querySelector('.pergamino');
    expect(pergamino.getAttribute('aria-live')).toBe('polite');
    component.alternarPausa();
    fixture.detectChanges();
    expect(pergamino.getAttribute('aria-live')).toBe('off');
  });
});
