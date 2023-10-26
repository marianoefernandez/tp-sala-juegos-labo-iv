import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";

const web = 'https://www.deckofcardsapi.com';

@Injectable({
  providedIn: 'root'
})
export class MayorMenorService {
  constructor(private http: HttpClient) 
  { 

  }

  public generarMazo()
  {
    try
    {
      return this.http.get(web + "/api/deck/new/shuffle/?deck_count=1");
    }
    catch(error : any)
    {
      return error.code;
    }
  }

  public obtenerCarta(deckId:string)
  {
    try
    {
      return this.http.get(web + "/api/deck/" + deckId + "/draw/?count=1");
    }
    catch(error : any)
    {
      return error.code;
    }
  }

}
