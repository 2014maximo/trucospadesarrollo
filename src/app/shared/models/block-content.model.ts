import { ImageAdapterModel } from "./image-adapter.model";

export class BlockContentModel {
    blocks: RowBlocks[]=[];
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
}

export class TextModel {
    text?: string = '';
    styleText?: string = '';
}