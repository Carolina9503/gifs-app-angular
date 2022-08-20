import { HttpClient } from '@angular/common/http'; //Me ofrece un  monton de servicios
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private api: any = "01BRnwJAE6xN4PVNJ0OxHMyvoQhFMabe"
  private _historial: string[] = []
  public resultados: any[] = []


  get historial() {    
    return [...this._historial]
  }
  constructor(private http: HttpClient){}

  buscarGifs(query: string = "") {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);      
    }
    
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=01BRnwJAE6xN4PVNJ0OxHMyvoQhFMabe&q=${ query }&limit=10`)
      .subscribe((resp: any) => {
        this.resultados = resp.data;
        console.log("resp",this.resultados)
      })
  }
}
