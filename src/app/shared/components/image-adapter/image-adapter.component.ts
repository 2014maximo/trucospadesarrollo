import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostBinding, Inject, Input, OnDestroy, PLATFORM_ID } from '@angular/core';
import { ImageAdapterModel } from '../../models/image-adapter.model';

@Component({
	selector: 'app-image-adapter',
	imports: [CommonModule],
	templateUrl: './image-adapter.component.html',
	styleUrl: './image-adapter.component.css'
})
export class ImageAdapterComponent implements OnDestroy {

	constructor(@Inject(PLATFORM_ID) private platformId: Object){}
	@Input() image: ImageAdapterModel = new ImageAdapterModel();

	@HostBinding('class') get hostClasses(): string {
		return `image-adapter ${this.image.customClass}`.trim();
	}

	isModalOpen = false;

	get hasSrc(): boolean {
		return !!this.image?.src?.trim();
	}

	get isTypeB(): boolean {
		return this.image?.typeImage === 'type-B';
	}

	get typeBWidth(): string {
		return this.image?.width && this.image.width !== 'auto' ? this.image.width : '100%';
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
		if (isPlatformBrowser(this.platformId)) {
		document.body.style.overflow = '';
		}
	}
}
