import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiEndpoint: string = `${environment.apiEndpoint}/usuario`;

  constructor(private http: HttpClient) { }


  authenticate(login: any) : Observable<Usuario> {
    return this.http.post(`${this.apiEndpoint}/authenticate`, login).pipe(
      map(this.jsonDataToObject.bind(this)),
      catchError(this.handleError)
    )
  }


  create(usuario: any) : Observable<Usuario> {
    return this.http.post(`${this.apiEndpoint}/create`, usuario).pipe(
      map(this.jsonDataToObject.bind(this)),
      catchError(this.handleError)
    )
  }

  createInternal(usuario: any) : Observable<Usuario> {
    return this.http.post(`${this.apiEndpoint}/createInternal`, usuario).pipe(
      map(this.jsonDataToObject.bind(this)),
      catchError(this.handleError)
    )
  }

  
  update(usuario: Usuario) : Observable<Usuario> {
    return this.http.post(`${this.apiEndpoint}/update`, usuario).pipe(
      map(this.jsonDataToObject.bind(this)),
      catchError(this.handleError)
    )
  }


  // concluirCadastro(id: string) : Observable<Usuario> {
  //   return this.http.post(`${this.apiEndpoint}/concluirCadastro`, id).pipe(
  //     map(this.jsonDataToObject.bind(this)),
  //     catchError(this.handleError)
  //   )
  // }
  concluirCadastro(usuario: Usuario) : Observable<Usuario> {
    return this.http.post(`${this.apiEndpoint}/concluirCadastro`, usuario).pipe(
      map(this.jsonDataToObject.bind(this)),
      catchError(this.handleError)
    )
  }


  get(id: string) : Observable<Usuario> {
    return this.http.get(`${this.apiEndpoint}/get/${id}`).pipe(
      map(this.jsonDataToObject.bind(this)),
      catchError(this.handleError)
    );
  }

  
  getAll() : Observable<Usuario[]> {
    
    return this.http.get(`${this.apiEndpoint}/getAll`).pipe(
      map(this.jsonDataToObjects.bind(this)),
      catchError(this.handleError)
    )
  }


  resetPassword(usuario) : Observable<Usuario> {
    return this.http.post(`${this.apiEndpoint}/resetPassword`, usuario).pipe(
      map(x => x),
      catchError(this.handleError)
    )
  }
  

  updatedPassword(usuario) : Observable<Usuario> {
    return this.http.post(`${this.apiEndpoint}/updatedPassword`, usuario).pipe(
      map(x => x),
      catchError(this.handleError)
    )
  }


  // Private Methods
  private jsonDataToObject(jsonData: any) : Usuario {
    if (jsonData == null) return null;
    return Object.assign(new Usuario(), jsonData);
  }

  
  private jsonDataToObjects(jsonData: any[]) : Usuario[] {
    const usuarios: Usuario[] = [];
    jsonData.forEach(element => {
      usuarios.push(Object.assign(new Usuario(), element));
    });

    return usuarios;
  }


  private handleError(err: any) : Observable<any> {
    console.error('OCORREU UM ERRO AO PROCESSAR A SOLICITAÇÃO', err);
    return throwError(err);
  }
}
