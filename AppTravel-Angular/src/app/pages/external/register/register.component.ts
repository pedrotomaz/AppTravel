import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  formCadastro: FormGroup;
  usuario: Usuario;

  constructor(
    private authService: AuthenticationService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
   this.retrieveUser(); 
    this.buildForm();
  }

  onSubmit(){
    if(this.formCadastro.valid){
      const usuario: any = this.formCadastro.value;

      this.usuarioService.create(usuario).subscribe(
        success => this.actionsForSuccess(success),
        error => this.actionsForError(error)
      )
    }
  }

  // Methods Private
  private retrieveUser(){
    this.usuario = this.authService.getCurrentUser();
  }

  private actionsForSuccess(usuario: Usuario) {
    // this.loading = false;
    this.authService.setCurrentUser(usuario);

    this.router.navigate(['/main/rating']);
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
      swalOpt.text = error.error;
    }

    // this.loading = false;

    Swal.fire(swalOpt);
  }

  private buildForm(){
    this.formCadastro = this.fb.group({
      id: [''],
      nome: ['', [Validators.required]],
      username: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      // confirmaSenha: ['', [Validators.required]],
      isAdmin: [false]
    });
    //,{ validator: this.checkPasswords });
  }


  // private checkPasswords(group: FormGroup) { 
  //   let pass = group.get('senha').value;
  //   let confirmPass = group.get('confirmaSenha').value;
    
  //   return pass === confirmPass ? null : { notSame: true }     
  // }

}
