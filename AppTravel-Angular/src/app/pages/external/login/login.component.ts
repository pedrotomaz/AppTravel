import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AuthenticationService } from 'src/app/shared/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  usuario: Usuario;


  constructor(
    private authService: AuthenticationService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildFormLogin();
  }


  submitForm() {
    if (this.formLogin.valid) {
      const login: any = this.formLogin.value;
      //this.loading = true;

      this.usuarioService.authenticate(login).subscribe(
        usuario => this.actionsForSuccess(usuario),
        error => this.actionsForError(error)
      );
    }
  }



  // private METHODS  
  private actionsForSuccess(usuario: Usuario) {
    this.authService.setCurrentUser(usuario);
    

    if (usuario.id != null && usuario.id != '') {
      if (usuario.cadastroConcluido)
        this.router.navigate(['main','home']);
      else
        this.router.navigate(['main','rating']);  
      
    } else {
      this.router.navigate(['/login']);
    }
  }


  private actionsForError(error: any) {
    let swalOpt: any = {
      title: 'Erro'
    };
    
    if (error.status === 0) {
      swalOpt.imageUrl = '../assets/images/cloud-off.png';
      swalOpt.imageHeight = 100;
      swalOpt.text = 'Não foi possível comunicar com o servidor';
    } else {
      swalOpt.icon = 'error';
      swalOpt.text = error.error.message;
    }

    // this.loading = false;

    Swal.fire(swalOpt);

    this.formLogin.get('senha').setValue('');
  }


  private buildFormLogin(){
    this.formLogin = this.fb.group({
      username: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }

}
