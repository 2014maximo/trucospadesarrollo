import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { BlogContentService } from 'src/app/features/blog/services/blog-content.service';
import { PostViewModel } from 'src/app/features/blog/models/post-view.model';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { TraduccionService } from 'src/app/shared/services/traduccion.service';
import { resolverIconoCategoria } from 'src/app/shared/components/categories/categories.helper';

interface FromBlogItem {
    id: string;
    titulo: string;
    resumen: string;
    imagenUrl: string;
    ruta: string;
    categoriaNombre: string;
    categoriaRuta: string;
    fecha: string;
}

type FromBlogEstado = 'cargando' | 'listo' | 'error' | 'vacio' | 'sin-api';

@Component({
    selector: 'app-from-blog',
    standalone: true,
    imports: [TranslateModule, CommonModule],
    templateUrl: './from-blog.component.html',
    styleUrl: './from-blog.component.css'
})
export class FromBlogComponent implements OnInit, OnDestroy {
    posts: FromBlogItem[] = [];
    estado: FromBlogEstado = 'cargando';
    private readonly destroy$ = new Subject<boolean>();

    constructor(
        public translate: TranslateService,
        private blogContent: BlogContentService,
        private themeService: ThemeService,
        private traduccion: TraduccionService
    ) {
        this.translate.addLangs(['fr', 'en', 'es']);
        this.translate.setDefaultLang('es');
        this.translate.use('es');
    }

    ngOnInit(): void {
        if (!this.blogContent.hasBaseUrl()) {
            this.estado = 'sin-api';
            return;
        }
        this.cargarPosts();
        this.traduccion.cambioIdioma$.pipe(takeUntil(this.destroy$)).subscribe({
            next: () => this.cargarPosts()
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    iconoCategoria(categoriaNombre: string): string {
        return resolverIconoCategoria(categoriaNombre, this.themeService.theme());
    }

    private cargarPosts(): void {
        this.estado = 'cargando';
        this.blogContent.getLatestPosts(3).subscribe({
            next: posts => {
                this.posts = posts.map(p => this.toItem(p));
                this.estado = this.posts.length > 0 ? 'listo' : 'vacio';
            },
            error: err => {
                console.error('[FromBlog] Error al cargar posts:', err);
                this.estado = 'error';
            }
        });
    }

    private toItem(post: PostViewModel): FromBlogItem {
        const categoriaLower = (post.categoriaNombre || '').toLowerCase();
        return {
            id: post.id,
            titulo: post.titulo,
            resumen: this.stripHtml(post.resumenHtml),
            imagenUrl: post.imagenDestacada ?? '',
            ruta: `/blog/${categoriaLower}/${post.slug}`,
            categoriaNombre: post.categoriaNombre,
            categoriaRuta: `/blog/${categoriaLower}`,
            fecha: ((post.fechaModificacion || post.fechaPublicacion) || '').substring(0, 10)
        };
    }

    private stripHtml(html: string): string {
        if (!html) return '';
        if (typeof document === 'undefined') {
            return html.replace(/<[^>]+>/g, '').trim();
        }
        const el = document.createElement('div');
        el.innerHTML = html;
        return (el.textContent ?? el.innerText ?? '').trim();
    }
}
