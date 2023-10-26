

export class Ahorcado
{
    public letrasRestantes : any = [];
    public estadoJuego: boolean = true;
    public puntuacion : number = 0;
    public vidas : number = 6;
    public palabraOculta : string = "";
    public palabra : string = ""; 
    public tematica : string = "";
    public listaTemas : any = [];
    public listaPalabras : any = [];

    constructor(temas:any,palabrasPorTema:any)
    {
        this.listaTemas = temas;
        this.listaPalabras = palabrasPorTema;
        this.inicializarJuego();
    }

    private inicializarJuego()
    {
        this.generarTematica();
        this.generarPalabra();
        this.ocultarPalabra();   
        this.puntuacion = 0;
        this.vidas = 6;
        this.estadoJuego = true;    
    }

    private ocultarPalabra()
    {
        this.palabraOculta = this.palabra.replace(/[a-zA-Z]/g, "_");
    }

    private generarPalabra()
    {
        this.palabra = this.listaPalabras[this.tematica][Math.random() * this.listaPalabras[this.tematica].length | 0];
    }

    private generarTematica()
    {
        this.tematica = this.listaTemas[Math.random() * this.listaTemas.length | 0];
    }

    public modificarPalabra(letra:string)
    {
        let palabraModificada = "";
        let contador = 0;

        for(let i = 0;i<this.palabra.length;i++)
        {
            if (this.palabra[i] == letra)
            {
                contador++;
                palabraModificada += letra;
            }
            else
            {
                palabraModificada += this.palabraOculta[i];
            }
        }

        this.palabraOculta = palabraModificada;

        return contador;
    }

    public verificarPalabra(letra:string)
    {
        let palabraModificada = this.palabraOculta;

        for(let i = 0;i<this.palabra.length;i++)
        {
            if (this.palabra[i] == letra)
            {
                return true;
            }
        }

        return false;
    }

    public reiniciar()
    {
        this.inicializarJuego();
    }

    public jugar(letraElegida:string)
    {
        if(this.verificarPalabra(letraElegida))
        {
            this.puntuacion += this.modificarPalabra(letraElegida) * 10;
        }
        else
        {
            this.vidas -= 1;
            if(this.puntuacion - 5 >= 0)
            {
                this.puntuacion -= 5
            }
        }

        if (this.vidas == 0)
        {
            this.estadoJuego = false;
        }

        if(this.palabra == this.palabraOculta)
        {
            this.puntuacion += 100;
            this.generarTematica();
            this.generarPalabra();
            this.ocultarPalabra();
            return 2;
        }

        return 1;
    }
}