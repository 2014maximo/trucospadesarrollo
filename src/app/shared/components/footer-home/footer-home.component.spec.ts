import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FooterHomeComponent } from './footer-home.component';

describe('FooterHomeComponent', () => {
  let component: FooterHomeComponent;
  let fixture: ComponentFixture<FooterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterHomeComponent, TranslateModule.forRoot()],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('el título rota y termina componiendo el nombre del blog, accesible completo', () => {
    const titulo: HTMLElement = fixture.nativeElement.querySelector('#fh-titulo');
    expect(titulo.querySelector('.visually-hidden')?.textContent).toBe('titulo_blog');
    expect(titulo.querySelector('app-word-rotator')).toBeTruthy();
  });
});
