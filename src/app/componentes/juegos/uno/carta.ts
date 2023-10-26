export class Carta
{
    public color : string;
    public tipo : string;
    public valor : number;
    public textura : string;
    public texturaAtras : string;

    constructor(color:string,tipo:string,valor:number,textura:string,texturaAtras:string)
    {
        this.color = color;
        this.tipo = tipo;
        this.valor=valor;
        this.textura = textura;
        this.texturaAtras = texturaAtras;
    }
} 