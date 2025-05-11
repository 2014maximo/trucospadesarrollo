import { ImageModel } from "./commons.model";

export class FirstDescriptionBlockModel {

    title?: TitleDescriptionModel;
    textBlock?: TextBlockModel[];
    referenceContent?: ReferenceContentModel[];

    constructor() {
        this.textBlock = [];
        this.title = new TitleDescriptionModel();
    }
}

export class TitleDescriptionModel{
    title?: string[];
    description?: string | undefined;

    constructor(){
        this.title = [];
        this.description = '';
    }
}

export class TextBlockModel {
    subtitle?: string[];
    textBlock?: textGroupModel[];
    image?: ImageModel;

    constructor() {
        this.subtitle = [];
        this.textBlock = [];
    }
}

export class ReferenceContentModel {
    title: string;
    link: string;
    description: string;
    classStyle: string;

    constructor() {
        this.title = '';
        this.link = '';
        this.description = '';
        this.classStyle = '';
    }
}

export class textGroupModel {
    sectionText: string;
    styleText?: string;

    constructor() {
        this.sectionText = '';
    }
}