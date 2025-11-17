import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'app-image-adapter',
	imports: [CommonModule],
	templateUrl: './image-adapter.component.html',
	styleUrl: './image-adapter.component.css'
})
export class ImageAdapterComponent {
	@Input() src: string = '';
	@Input() alt: string = '';
	@Input() width: string = 'auto';
	@Input() height: string = 'auto';
	@Input() objectFit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down' = 'contain';
	@Input() borderRadius: string = '0';
	@Input() showZoomIcon: boolean = true;
	@Input() zoomIconPosition: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';
	@Input() customClass: string = '';

	@HostBinding('class') get hostClasses() {
		return `image-adapter ${this.customClass}`;
	}

	isModalOpen = false;

	get imageStyles() {
		return {
			width: this.width,
			height: this.height,
			objectFit: this.objectFit,
			borderRadius: this.borderRadius
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