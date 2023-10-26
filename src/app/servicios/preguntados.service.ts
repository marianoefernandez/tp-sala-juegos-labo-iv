import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";

const pregunta = "https://opentdb.com/api.php?amount=1&type=multiple";
const foto = "https://api.unsplash.com/search/photos?client_id=CXTqJZq4rTadML5sVLFAr7yQk6Ni6qB19px26pTra68&query=";

@Injectable({
  providedIn: 'root'
})

export class PreguntadosService {
  constructor(private http: HttpClient)
  {

  }


  public obtenerPregunta()
  {
    try
    {
      return this.http.get(pregunta);
    }
    catch(error : any)
    {
      return error.code;
    }
  }

  public obtenerFoto(palabraClave:string)
  {
    try
    {
      return this.http.get(foto + palabraClave);
    }
    catch(error : any)
    {
      return error.code;
    }
  }
}
