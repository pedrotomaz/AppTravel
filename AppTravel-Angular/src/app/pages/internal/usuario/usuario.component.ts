import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  form: FormGroup;
  responsiveOptions: any = [];
  usuario: Usuario;
  selectedUsuario: Usuario;
  cols: any[];
  

  constructor(
    private authService: AuthenticationService,
    private usuarioService: UsuarioService,
    private router: Router) { }




  ngOnInit() {
    this.retrieveUser();
    this.loadUsuarios();
    this.buildGrid();
  }


  onClickAdd(){
    this.router.navigate(['main','usuario','new']);
  }


  selectRow(rowData) {
    if(this.usuario.isAdmin)
      this.router.navigate(['main', 'usuario', 'edit', rowData.id]);
}

  

  // Privates Methods
  private retrieveUser(){
    this.usuario = this.authService.getCurrentUser();
  }



  private buildGrid(){
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'nome', header: 'Nome' },
      { field: 'username', header: 'Username' }
  ];
  }



  private loadUsuarios() {
    this.usuarioService.getAll().subscribe(
      locais => this.actionsForSuccessLoadUsuarios(locais),
      error => this.actionsForErrorLoadUsuarios(error)
    )
  }




  private actionsForSuccessLoadUsuarios(usuarios: Usuario[]) {
    this.usuarios = usuarios;
  }


  private actionsForErrorLoadUsuarios(error: any) {
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


}
