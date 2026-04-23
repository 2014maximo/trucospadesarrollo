import { Component } from '@angular/core';
import { CategoriaPostModel, DatosPost } from '@models/categorias.model';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CategoriaModel } from 'src/app/shared/models/post.model';
import { EXT_MONEY } from '../dev-extra-money/constants/dev-extra-money.constant';
import { cargarBreadcrumb, postActual } from '@shared//global-functions';
import { CATEGORIA } from '@constants/categories.constant';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HeaderPostSupplementComponent } from 'src/app/shared/components/header-post-supplement/header-post-supplement.component';
import { IndexButtonsComponent } from 'src/app/shared/components/index-buttons/index-buttons.component';
import { ContentIndexComponent } from "src/app/shared/components/content-index/content-index.component";
import { CommonModule } from '@angular/common';
import { ContentAuthorModel } from 'src/app/shared/models/content-author.model';
import { ContentAuthorComponent } from 'src/app/shared/components/content-author/content-author.component';

@Component({
	selector: 'app-dev-sites',
	imports: [
		FooterComponent,
		CommonModule,
		IndexButtonsComponent,
		ContentAuthorComponent,
		HeaderPostSupplementComponent,
		HeaderComponent,
	],
	templateUrl: './dev-sites.component.html',
	styleUrl: './dev-sites.component.css'
})
export class DevSitesComponent {

	public idPublicacion = '6f3b8325-3262-421f-ac5a-7ed4946487a6';
	public breadcrumb = new CategoriaModel();
	public publicacion = new DatosPost();
	public categoria = new CategoriaPostModel();
	public ideasExtraMoney = EXT_MONEY;
	public datesAuthor = new ContentAuthorModel();
	public indexButtons = [
		{ title: 'Diseño Gráfico', description: 'Explora nuestros recursos de diseño creativo y profesional con las mejores herramientas.' },
		{ title: 'Desarrollo Web', description: 'Aprende las últimas tecnologías y frameworks para crear páginas rápidas y modernas.' },
		{ title: 'Servidores & Hosting', description: 'Configura tus proyectos de manera profesional, garantizando alta disponibilidad.' }
	];


	ngOnInit(): void {
		this.publicacion = postActual(this.idPublicacion)[0];
		this.breadcrumb = cargarBreadcrumb(this.publicacion);
		this.categoria = CATEGORIA.filter(e => e.nombre === this.publicacion.categoria)[0];

		this.datesAuthor = {
			name: 'Alex M.',
			srcAvatar: 'assets/img/author.png',
			linkRefenceAuthor: 'https://2014maximo.github.io/alexmunoz/'
		}
		
	}

	scroll(el: HTMLElement) {
		el.scrollIntoView();
	}

}
