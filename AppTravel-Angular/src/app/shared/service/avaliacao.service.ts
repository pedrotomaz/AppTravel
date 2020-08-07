import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Avaliacao } from '../model/avaliacao.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {


  private apiEndpoint: string = `${environment.apiEndpoint}/avaliacao`;

  constructor(
    private http: HttpClient
  ) { }

  

  
  create(avaliacao: Avaliacao) : Observable<Avaliacao> {
    return this.http.post(`${this.apiEndpoint}/create`, avaliacao).pipe(
      map(this.jsonDataToObject.bind(this)),
      catchError(this.handleError)
    )
  }


  update(avaliacao: Avaliacao) : Observable<Avaliacao> {
    return this.http.post(`${this.apiEndpoint}/update`, avaliacao).pipe(
      map(this.jsonDataToObject.bind(this)),
      catchError(this.handleError)
    )
  }


  



  private jsonDataToObject(jsonData: any) : Avaliacao {
    return Object.assign(new Avaliacao(), jsonData);
  }
  

  private handleError(err: any) : Observable<any> {
    console.error('OCORREU UM ERRO AO PROCESSAR A SOLICITAÇÃO', err);
    return throwError(err);
  }
}
