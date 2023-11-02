import { Injectable } from '@angular/core';
import translate from "translate";


@Injectable({
  providedIn: 'root'
})
export class TraductorService {

  constructor() { }

  async traducir(texto: string, idioma: string = 'es'): Promise<string | null> {
    try 
    {
      const translation = await translate(
        texto.replace(/&#039;/g, '"')
        .replace(/&deg;/g, '°')
        .replace(/&quot;/g, '"')
        .replace(/&ouml;/g, 'ö')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, '&')
        .replace('&', 'and')
        .replace(/&nbsp;/g, ' ')
        ,idioma);
      return translation;
    } 
    catch (error:any) 
    {
      console.log(error.code);
      return null;
    }
  }

}
