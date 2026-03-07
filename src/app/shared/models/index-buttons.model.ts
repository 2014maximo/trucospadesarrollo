import { ImgSlider } from '../../features/blog/models/categorias.model';
export class IndexButtonsModel {
    public id: string = '';
    public name: string = '';
    public individualStyle: IndexButtonsStyleModel = new IndexButtonsStyleModel();
    public resources: IndexButtonsResourcesModel[] = [];
}

export class IndexButtonsStyleModel {
    public backgroundColor: string = '';
    public textColor: string = '';
    public fontFamily: string = '';
    public fontSize: string = '';
    public rotation: string = '';
}

export class IndexButtonsResourcesModel {
    public title: string = '';
    public description: string = '';
    public ImgSlider: IndexButtonsImgSliderModel = new IndexButtonsImgSliderModel();
    public url: string = '';
}

export class IndexButtonsImgSliderModel {
    public alt: string = '';
    public src: string = '';
    public height: number = 0;
    public width: number = 0;
}
