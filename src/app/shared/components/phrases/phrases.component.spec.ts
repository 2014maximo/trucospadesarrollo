import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PhrasesComponent } from './phrases.component';

describe('PhrasesComponent', () => {
  let component: PhrasesComponent;
  let fixture: ComponentFixture<PhrasesComponent>;
  let translate: TranslateService;

  beforeEach(async () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe iniciar en estado cargando', () => {
    expect(component.estado).toBe('cargando');
  });

  it('typeNext debe escribir el primer carácter de la frase', () => {
    component.frases = [
      { frase: 'Hola', autor: 'Test', borde: '', colorText: '', id: 1 }
    ];
    component.typeNext();
    expect(component.displayPhrase).toBe('H');
    expect(component.charIndex).toBe(1);
  });

  it('typeNext debe escribir el autor tras completar la frase', () => {
    component.frases = [
      { frase: 'OK', autor: 'Juan', borde: '', colorText: '', id: 1 }
    ];
    component.displayPhrase = 'OK';
    component.charIndex = 2;
    (component as any).typePhase = 'phrase';

    component.typeNext();
    // Frase completa → transita a author y escribe 'J'
    expect(component.displayAuthor).toBe('J');
    expect(component.charIndex).toBe(1);
  });

  it('typeNext debe borrar autor antes que frase en fase delete', () => {
    component.frases = [
      { frase: 'Hola', autor: 'Juan', borde: '', colorText: '', id: 1 }
    ];
    component.displayPhrase = 'Hola';
    component.displayAuthor = 'Juan';
    component.currentPhraseIndex = 0;
    (component as any).typePhase = 'delete';

    component.typeNext();
    expect(component.displayAuthor).toBe('Jua');
    expect(component.displayPhrase).toBe('Hola');
  });

  it('typeNext debe pasar a siguiente frase tras borrar todo', () => {
    component.frases = [
      { frase: 'A', autor: 'Uno', borde: '', colorText: '', id: 1 },
      { frase: 'B', autor: 'Dos', borde: '', colorText: '', id: 2 }
    ];
    component.displayPhrase = '';
    component.displayAuthor = '';
    component.currentPhraseIndex = 0;
    (component as any).typePhase = 'delete';

    component.typeNext();
    expect(component.currentPhraseIndex).toBe(1);
    expect((component as any).typePhase).toBe('phrase');
    expect(component.charIndex).toBe(0);
  });
});
