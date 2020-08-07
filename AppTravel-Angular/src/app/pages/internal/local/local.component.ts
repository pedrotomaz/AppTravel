import { Component, OnInit } from '@angular/core';
import { Local } from 'src/app/shared/model/local.model';
import { LocalService } from 'src/app/shared/service/local.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Avaliacao } from 'src/app/shared/model/avaliacao.model';
import { FormGroup } from '@angular/forms';
import { AvaliacaoService } from 'src/app/shared/service/avaliacao.service';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';




@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  locaisHint: Local[] = [];
  locais: Local[] = [];
  form: FormGroup;
  responsiveOptions: any = [];
  usuario: Usuario;
  selectedLocal: Local;
  cols: any[];
  

  constructor(
    private authService: AuthenticationService,
    private localService: LocalService,
    private router: Router) { }




  ngOnInit() {
    this.retrieveUser();
    this.loadLocais();
    this.buildGrid();
  }




  onClickAdd(){
    this.router.navigate(['main','local','new']);
  }



  selectRow(rowData) {
    if(this.usuario.isAdmin)
      this.router.navigate(['main', 'local', 'edit', rowData.id]);
}

  

  // Privates Methods
  private retrieveUser(){
    this.usuario = this.authService.getCurrentUser();
  }



  private buildGrid(){
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'nome', header: 'Nome' },
      { field: 'cidade', header: 'Cidade' },
      { field: 'uf', header: 'Estado' },
      { field: 'telefone', header: 'Telefone' }
  ];
  }



  private loadLocais() {
    this.localService.getAll().subscribe(
      locais => this.actionsForSuccessLoadLocais(locais),
      error => this.actionsForErrorLoadLocais(error)
    )
  }


  private loadLocaisByUsuario() {
    this.localService.getAllByUsuario(this.usuario.id).subscribe(
      locais => this.actionsForSuccessLoadLocais(locais),
      error => this.actionsForErrorLoadLocais(error)
    )
  }


  private actionsForSuccessLoadLocais(locais: Local[]) {
    this.locais = locais;
  }


  private actionsForErrorLoadLocais(error: any) {
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



  private actionsForErrorLoadLocaisHint(error: any) {
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
}
