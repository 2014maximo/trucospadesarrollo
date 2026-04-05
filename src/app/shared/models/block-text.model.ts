import { ImageAdapterModel } from "./image-adapter.model";

export class BlockTextModel {
    title?: TextModel = new TextModel();
    subtitle?: string = '';
    image?: ImageAdapterModel = new ImageAdapterModel();
    groupblock?: GroupBlockTextModel[] = [];
}

export class TextModel {
    textI18n?: string = '';
    style?: string = '';
}

export class GroupBlockTextModel {
    title?: TextModel = new TextModel();
    subtitle?: TextModel = new TextModel();
    image?: ImageAdapterModel = new ImageAdapterModel();
    paragraph?: TextModel [] = [];
}