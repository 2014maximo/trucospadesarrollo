import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { PostViewModel } from 'src/app/features/blog/models/post-view.model';
import { CategoryViewModel } from 'src/app/features/blog/models/category-view.model';

const NOMBRE_SITIO = "Trucos pa' desarrollo";
const DESCRIPCION_LARGO_MAXIMO = 155;
const JSON_LD_ID = 'seo-json-ld';

/**
 * Centraliza el `<title>`, las `<meta>` (description/Open Graph/Twitter Card),
 * el `<link rel="canonical">` y el JSON-LD de cada página.
 *
 * Sin esto, el `<head>` estático de `index.html` (mismo título/description
 * para todas las rutas) es lo único que ven buscadores y bots de preview
 * social (WhatsApp/Facebook/Twitter no ejecutan JS, así que dependen de lo
 * que el SSR entregue en el HTML inicial).
 */
@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document,
  ) { }

  /**
   * Actualiza el `<head>` para un post individual.
   * @param categoriaRuta slug de categoría tal como aparece en la URL
   *   (`this.route.snapshot.paramMap.get('categoria')`), no `post.categoriaNombre`.
   */
  actualizarPost(post: PostViewModel, categoriaRuta: string): void {
    const descripcion = this.truncar(this.stripHtml(post.resumenHtml));
    const url = `${environment.siteUrl}/blog/${categoriaRuta}/${post.slug}`;

    this.setTituloYDescripcion(post.titulo, descripcion);
    this.setCanonical(url);

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:title', content: post.titulo });
    this.meta.updateTag({ property: 'og:description', content: descripcion });
    this.meta.updateTag({ property: 'og:url', content: url });
    if (post.imagenDestacada) {
      this.meta.updateTag({ property: 'og:image', content: post.imagenDestacada });
    }
    if (post.fechaPublicacion) {
      this.meta.updateTag({ property: 'article:published_time', content: post.fechaPublicacion });
    }
    if (post.fechaModificacion) {
      this.meta.updateTag({ property: 'article:modified_time', content: post.fechaModificacion });
    }

    this.setTwitterCard(post.titulo, descripcion, post.imagenDestacada);

    this.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.titulo,
      description: descripcion,
      datePublished: post.fechaPublicacion || undefined,
      dateModified: post.fechaModificacion || post.fechaPublicacion || undefined,
      image: post.imagenDestacada || undefined,
      mainEntityOfPage: url,
      publisher: { '@type': 'Organization', name: NOMBRE_SITIO }
    });
  }

  /** Actualiza el `<head>` para una página de categoría. */
  actualizarCategoria(categoria: CategoryViewModel, categoriaRuta: string): void {
    const descripcion = this.truncar(this.stripHtml(categoria.contenidoHtml));
    const url = `${environment.siteUrl}/blog/${categoriaRuta}`;

    this.setTituloYDescripcion(categoria.titulo, descripcion);
    this.setCanonical(url);

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: categoria.titulo });
    this.meta.updateTag({ property: 'og:description', content: descripcion });
    this.meta.updateTag({ property: 'og:url', content: url });

    this.setTwitterCard(categoria.titulo, descripcion);

    this.removeJsonLd();
  }

  private setTituloYDescripcion(titulo: string, descripcion: string): void {
    this.title.setTitle(`${titulo} | ${NOMBRE_SITIO}`);
    this.meta.updateTag({ name: 'description', content: descripcion });
  }

  private setTwitterCard(titulo: string, descripcion: string, imagen?: string): void {
    this.meta.updateTag({ name: 'twitter:card', content: imagen ? 'summary_large_image' : 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: titulo });
    this.meta.updateTag({ name: 'twitter:description', content: descripcion });
    if (imagen) {
      this.meta.updateTag({ name: 'twitter:image', content: imagen });
    } else {
      this.meta.removeTag('name="twitter:image"');
    }
  }

  private setCanonical(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(data: Record<string, unknown>): void {
    this.removeJsonLd();
    const script = this.document.createElement('script');
    script.id = JSON_LD_ID;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(this.omitirVacios(data));
    this.document.head.appendChild(script);
  }

  private removeJsonLd(): void {
    this.document.getElementById(JSON_LD_ID)?.remove();
  }

  private omitirVacios(data: Record<string, unknown>): Record<string, unknown> {
    return Object.fromEntries(Object.entries(data).filter(([, valor]) => valor !== undefined));
  }

  /** SSR-safe: usa regex si no hay DOM disponible (igual que BlogContentService.stripHtmlToText). */
  private stripHtml(html: string): string {
    if (!html) return '';
    if (typeof this.document.createElement !== 'function') {
      return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    }
    const el = this.document.createElement('div');
    el.innerHTML = html;
    return (el.textContent ?? '').replace(/\s+/g, ' ').trim();
  }

  private truncar(texto: string): string {
    if (texto.length <= DESCRIPCION_LARGO_MAXIMO) return texto;
    const cortado = texto.slice(0, DESCRIPCION_LARGO_MAXIMO);
    return `${cortado.slice(0, cortado.lastIndexOf(' '))}...`;
  }
}
