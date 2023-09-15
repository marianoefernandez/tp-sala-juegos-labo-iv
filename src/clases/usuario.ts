class Usuario
{
    public nombre:string = "";
    public email:string = ""
    public clave:string = "";
    
    constructor(nombre:string,email:string,clave:string)
    {
        this.nombre = nombre;
        this.email = email;
        this.clave = clave;
    }
}

export default Usuario;
