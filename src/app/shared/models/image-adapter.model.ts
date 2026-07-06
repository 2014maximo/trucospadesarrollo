export class ImageAdapterModel {
    src: string = '';
	alt: string = '';
	width: string = 'auto';
	height: string = 'auto';
	objectFit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down' = 'contain';
	borderRadius: string = '0';
	showZoomIcon: boolean = true;
	zoomIconPosition: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';
	customClass: string = '';
	typeImage: 'type-A' | 'type-B' = 'type-A';
	creditUrl: string = '';
	creditText: string = '';
	creditTarget: string = '_blank';
	creditClasses: string = 'f-open-sans-c c7';
}