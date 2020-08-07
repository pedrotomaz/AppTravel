import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internal-main',
  templateUrl: './internal-main.component.html',
  styleUrls: ['./internal-main.component.css']
})
export class InternalMainComponent implements OnInit {

  usuario: Usuario;

  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.retrieveUser();
  }



  onLogout(){
    this.authService.logout();
    this.router.navigate(['/']);    
  }


  // Methods Privates
  private retrieveUser(){
    this.usuario = this.authService.getCurrentUser();
  }
}
