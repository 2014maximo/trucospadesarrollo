import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnDestroy } from '@angular/core';
import { ImageAdapterModel } from '../../models/image-adapter.model';

@Component({
	selector: 'app-image-adapter',
	imports: [CommonModule],
	templateUrl: './image-adapter.component.html',
	styleUrl: './image-adapter.component.css'
})
export class ImageAdapterComponent implements OnDestroy {
	@Input() image: ImageAdapterModel = new ImageAdapterModel();

	@HostBinding('class') get hostClasses(): string {
		return `image-adapter ${this.image.customClass}`.trim();
	}

	isModalOpen = false;

	get hasSrc(): boolean {
		return !!this.image?.src?.trim();
	}

	get imageStyles() {
		return {
			width: this.image.width,
			height: this.image.height,
			objectFit: this.image.objectFit,
			borderRadius: this.image.borderRadius
		};
	}

	openModal(event: Event): void {
		event.stopPropagation();
		this.isModalOpen = true;
		document.body.style.overflow = 'hidden';
	}

	closeModal(): void {
		this.isModalOpen = false;
		document.body.style.overflow = '';
	}

	onModalClick(event: Event): void {
		if (event.target === event.currentTarget) {
			this.closeModal();
		}
	}

	ngOnDestroy(): void {
		document.body.style.overflow = '';
	}
}
