import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Local } from '../model/local.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private apiEndpoint: string = `${environment.apiEndpoint}/local`;

  
  constructor(private http: HttpClient) { }




  create(local: Local) : Observable<Local> {
    return this.http.post(`${this.apiEndpoint}/create`, local).pipe(
      map(this.jsonDataToObject.bind(this)),
      catchError(this.handleError)
    )
  }


  update(local: Local) : Observable<Local> {
    return this.http.post(`${this.apiEndpoint}/update`, local).pipe(
      map(this.jsonDataToObject.bind(this)),
      catchError(this.handleError)
    )
  }


  getHint(usuarioId: string) : Observable<Local[]> {
    
    return this.http.get(`${this.apiEndpoint}/getHint/${usuarioId}`).pipe(
      map(this.jsonDataToObjects.bind(this)),
      catchError(this.handleError)
    )
  }


  getAll() : Observable<Local[]> {
    
    return this.http.get(`${this.apiEndpoint}/getAll`).pipe(
      map(this.jsonDataToObjects.bind(this)),
      catchError(this.handleError)
    )
  }

  getAllByUsuario(usuarioId: string) : Observable<Local[]> {
    
    return this.http.get(`${this.apiEndpoint}/getAllByUsuario/${usuarioId}`).pipe(
      map(this.jsonDataToObjects.bind(this)),
      catchError(this.handleError)
    )
  }


  get(id: string) : Observable<Local> {
    return this.http.get(`${this.apiEndpoint}/get/${id}`).pipe(
      map(this.jsonDataToObject.bind(this)),
      catchError(this.handleError)
    );
  }


  getByLocalAndUsuario(id: string, usuarioId: string) : Observable<Local> {
    return this.http.get(`${this.apiEndpoint}/getByLocalAndUsuario/${id}/${usuarioId}`).pipe(
      map(this.jsonDataToObject.bind(this)),
      catchError(this.handleError)
    );
  }



  uploadImage(formData: FormData){
    return this.http.post(`${this.apiEndpoint}/uploadImage`, formData).pipe(
      // map(this.jsonDataToObject.bind(this)),
      map(resp => resp),
      catchError(this.handleError)
    )    
  }


  

  getImage(localId: string) : Observable<Blob> {
    return this.http.get(`${this.apiEndpoint}/getImage/${localId}`, { responseType: 'blob' } ).pipe(
      map(file => file),
      catchError(this.handleError)
    )
  }


  getImage1() : Observable<Blob> {
    return this.http.get(`${this.apiEndpoint}/getImage1`, { responseType: 'blob' } ).pipe(
      map(file => file),
      catchError(this.handleError)
    )
  }



  getImage64() : Observable<Blob> {
    return this.http.get(`${this.apiEndpoint}/getImage64`, { responseType: 'blob' }).pipe(
      map(file => file),
      catchError(this.handleError)
    )
  }




  // Methods Privates
  private jsonDataToObject(jsonData: any) : Local {
    return Object.assign(new Local(), jsonData);
  }


  private jsonDataToObjects(jsonData: any[]) : Local[] {
    const locais: Local[] = [];
    jsonData.forEach(element => {
      locais.push(Object.assign(new Local(), element));
    });

    return locais;
  }


  private handleError(err: any) : Observable<any> {
    //console.error('OCORREU UM ERRO AO PROCESSAR A SOLICITAÇÃO', err);
    return throwError(err);
  }

}
