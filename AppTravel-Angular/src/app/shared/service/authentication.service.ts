import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../model/usuario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  
  updateEvt = new EventEmitter();


  constructor() { }



  getCurrentUser() : Usuario {
    if (sessionStorage.getItem(`user-${environment.applicationHash}`) == '')
      return undefined;

    const usuario = JSON.parse(sessionStorage.getItem(`user-${environment.applicationHash}`));
    return usuario;
  }


  setCurrentUser(usuario: Usuario) {
    this.removeCurrentUser();
    
    sessionStorage.setItem(`user-${environment.applicationHash}`, JSON.stringify(usuario));
  }


  logout() {
    this.removeCurrentUser();
  }
  

  // private METHODS
  private removeCurrentUser() {
    sessionStorage.removeItem(`user-${environment.applicationHash}`);
  }
}
