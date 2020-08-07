import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  usuario: Usuario;
  formCadastro: FormGroup;
  action: string = '';
  selectedUsuario: Usuario = null;
  

  constructor(
    private authService: AuthenticationService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.retrieveUser();
    this.buildForm();
    this.loadSelectedUsuario();
  }



  
  onSubmitForm(){
    this.formCadastro.get('senha').setValue('');
    if (this.formCadastro.valid) {
      this.action = this.route.snapshot.url[1].path.toString();
      
      if (this.action == 'edit') 
        this.updateUsuario();
      
      if (this.action == 'new') 
        this.createUsuario();
    }
  }
  

  onResetPassword(){
    Swal.fire({
      icon: 'question',
        title: 'Atenção',
        text: 'Quer realmente resetar a seha deste usuário?',
        showConfirmButton: true,
        confirmButtonText: 'Sim',
        showCancelButton: true,
        cancelButtonText: 'Não',
    }).then(ok =>{
      if(ok.value == true){
        this.usuarioService.resetPassword(this.selectedUsuario).subscribe(
          success => this.actionsForSuccessResetPassword(),
          error => this.actionsForError(error)
        )
      }
    });
  }


  onSavePassword(){
    if (this.formCadastro.get('id').value != '' && this.formCadastro.get('senha').value != ''){
      this.selectedUsuario = this.formCadastro.value;
      this.usuarioService.updatedPassword(this.selectedUsuario).subscribe(
        success => this.actionForSuccessUpdatePassword(),
        error => this.actionsForError(error)
      );
    }
  }



  onCleanPassword() {
    this.formCadastro.get('senha').setValue('');
  }

  // Private Methods
  private createUsuario(){
    const usuario: Usuario = this.formCadastro.value;
    
    this.usuarioService.createInternal(usuario).subscribe(
      usuario => this.actionsForSuccessCreateUsuario(usuario),
      error => this.actionsForError(error)
    )
  }


  private actionForSuccessUpdatePassword() {
    Swal.fire({
      icon: 'success',
      position: 'top-right',
      showConfirmButton: false,
      text: 'Senha alterada com sucesso!',
      toast: true,
      timer: 3000
    });
  }



  private actionsForSuccessResetPassword(){
    Swal.fire({
      icon: 'success',
      position: 'top-right',
      showConfirmButton: false,
      text: 'Senha renovada com sucesso!',
      toast: true,
      timer: 3000
    });
  }


  private actionsForSuccessCreateUsuario(usuario: Usuario) {
    this.formCadastro.get('id').setValue(usuario.id);
    
    this.router.navigate(['main', 'usuario', 'edit', usuario.id]);

    Swal.fire({
      icon: 'success',
      position: 'top-right',
      showConfirmButton: false,
      text: 'Usuário salvo com sucesso!',
      toast: true,
      timer: 3000
    });
  }


  private actionsForError(error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: error.error
    });
  }


  private updateUsuario(){
    const usuario: Usuario = this.formCadastro.value;

    this.usuarioService.update(usuario).subscribe(
      usuario => this.actionsForSuccessUpdateUsuario(usuario),
      error => this.actionsForErrorUpdateUsuario(error)
    )
  }



  private actionsForSuccessUpdateUsuario(usuario: Usuario) {
    this.formCadastro.get('id').setValue(usuario.id);
    
    Swal.fire({
      icon: 'success',
      position: 'top-right',
      showConfirmButton: false,
      text: 'Usuário alterado com sucesso!',
      toast: true,
      timer: 3000
    });
  }


  private actionsForErrorUpdateUsuario(error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: error.error
    });
  }



  private retrieveUser(){
    this.usuario = this.authService.getCurrentUser();
  }


  private loadSelectedUsuario(){
    this.action = this.route.snapshot.url[1].toString();
    let id = this.route.snapshot.params['id'];
    if(this.action == 'edit' && id != undefined){
      this.usuarioService.get(id).subscribe(
        user => this.actionForSuccessLoadUsuario(user),
        error => this.actionForErrorLoadUsuario(error)
      );
    }
  }


  private actionForSuccessLoadUsuario(usuario: Usuario) {
    this.selectedUsuario = usuario;
    this.formCadastro.patchValue(usuario);
  }


  private actionForErrorLoadUsuario(error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Tivemos um problema',
      text: error.error
    });
  }



  private buildForm(){
    this.formCadastro = this.fb.group({
      id:[''],
      nome:['', [Validators.required]],
      username:['', [Validators.required]],
      senha: ['']
    });
  }


  
}
