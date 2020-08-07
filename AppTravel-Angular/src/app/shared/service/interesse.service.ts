import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Interesse } from '../model/interesse';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Local } from '../model/local.model';

@Injectable({
  providedIn: 'root'
})
export class InteresseService {

  private apiEndpoint: string = `${environment.apiEndpoint}/interesse`;

  constructor(
    private http: HttpClient) { }

  

  
  create(interesse: Interesse) : Observable<Interesse> {
    return this.http.post(`${this.apiEndpoint}/create`, interesse).pipe(
      map(this.jsonDataToObject.bind(this)),
      catchError(this.handleError)
    )
  }


  update(interesse: Interesse) : Observable<Interesse> {
    return this.http.post(`${this.apiEndpoint}/update`, interesse).pipe(
      map(this.jsonDataToObject.bind(this)),
      catchError(this.handleError)
    )
  }


  getAllByUsuario(usuarioId: string) : Observable<Local[]> {
    
    return this.http.get(`${this.apiEndpoint}/getAllByUsuario/${usuarioId}`).pipe(
      map(this.jsonDataToObjects.bind(this)),
      catchError(this.handleError)
    )
  }


  getInterestListByUsuario(usuarioId: string) : Observable<Local[]> {
    
    return this.http.get(`${this.apiEndpoint}/getInterestListByUsuario/${usuarioId}`).pipe(
      map(this.jsonDataToObjects.bind(this)),
      catchError(this.handleError)
    )
  }


  private jsonDataToObjects(jsonData: any[]) : Local[] {
    const locais: Local[] = [];
    jsonData.forEach(element => {
      locais.push(Object.assign(new Local(), element));
    });

    return locais;
  }


  private jsonDataToObject(jsonData: any) : Interesse {
    return Object.assign(new Interesse(), jsonData);
  }
  

  private handleError(err: any) : Observable<any> {
    console.error('OCORREU UM ERRO AO PROCESSAR A SOLICITAÇÃO', err);
    return throwError(err);
  }
}
