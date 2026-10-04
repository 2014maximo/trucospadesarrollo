export class CodeModel {
    mostrarRuta: boolean;
    code: string;
    textRuta?: string;

    constructor() {
        this.mostrarRuta = false;
        this.code = '';
    }
}

/** Agrupa los inputs de PrintCodeComponent para poder incrustarlo, p. ej., desde ColumnsBlocks. */
export class PrintCodeModel {
    tipoCode?: 'lenguajes' | 'linux' | 'windows' | 'transparente' = 'lenguajes';
    code?: string = '';
    objectCode?: CodeModel[] = [];
    lenguaje?: string = '';
    categoriaCorta?: string = '';
    lineas?: number = 0;
    colorTextoBase?: string = '';
    refDocumentacion?: string = '';
    urlStackBlitz?: string = '';
}
