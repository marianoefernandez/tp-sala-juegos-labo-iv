export class MayorMenor
{
    public mazo:any;
    public carta:any = null;
    public cartaAnterior:any = null;
    public puntuacion:number = 0;
    public seleccionJugador:string = "";
    public estadoJuego:boolean = true;

    constructor(mazo:any)
    {
        this.mazo = mazo;
    }

    public determinarValor(carta:any)
    {
        let valor = carta["cards"][0]["value"];

        switch(valor)
        {
            case "KING":
                return 13;
            case "QUEEN":
                return 12;
            case "JACK":
                return 11;
            case "ACE":
                return 1;
            default:
                return parseInt(valor);
        }
    }

    public compararCartas(valorCarta:number,valorCartaAnterior:number)
    {
        if((this.seleccionJugador == "menor" && valorCarta < valorCartaAnterior) 
        || (this.seleccionJugador == "mayor" && valorCarta > valorCartaAnterior))
        {
            return true; 
        }  
        return false;
    }

    public async jugar()
    {
        let valorCarta = this.determinarValor(this.carta);
        let valorCartaAnterior = this.determinarValor(this.cartaAnterior);
        if(this.compararCartas(valorCarta,valorCartaAnterior))
        {
            this.puntuacion += 1;
        }
        else
        {
            if(valorCarta != valorCartaAnterior)
            {
                this.estadoJuego = false;
            }
        }
    }


}

