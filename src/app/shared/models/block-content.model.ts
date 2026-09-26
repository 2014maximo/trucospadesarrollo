import { ImageAdapterModel } from "./image-adapter.model";

export class BlockContentModel {
    blocks: RowBlocks[]=[];
    rowStyle?: string = '';
}

export class RowBlocks {
    initialStyle?: string = '';
    columns?: ColumnsBlocks[]=[]
}

export class ColumnsBlocks {
    styleCol?: string = '';
    title?: TextModel = new TextModel();
    subtitle?: TextModel = new TextModel();
    image?: ImageAdapterModel = new ImageAdapterModel();
    paragraph?: TextModel[]=[];
    list?: ListModel[]=[];
    blocks?: RowBlocks[]=[];
}

export class TextModel {
    /** Se renderiza con [innerHTML]: admite etiquetas inline como <strong>, <b>, <em>, <i>. */
    text?: string = '';
    styleText?: string = '';
    url?: string = '';
    target?: string = '_blank';
}

export class ListModel {
    type?: 'ordered' | 'unordered' = 'unordered';
    styleList?: string = '';
    items: TextModel[] = [];
}