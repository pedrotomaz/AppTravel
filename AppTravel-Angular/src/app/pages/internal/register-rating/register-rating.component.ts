import { Component, OnInit, Sanitizer } from '@angular/core';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { LocalService } from 'src/app/shared/service/local.service';
import { Local } from 'src/app/shared/model/local.model';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { InteresseService } from 'src/app/shared/service/interesse.service';
import { Interesse } from 'src/app/shared/model/interesse';
import { Avaliacao } from 'src/app/shared/model/avaliacao.model';
import { AvaliacaoService } from 'src/app/shared/service/avaliacao.service';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-rating',
  templateUrl: './register-rating.component.html',
  styleUrls: ['./register-rating.component.css']
})
export class RegisterRatingComponent implements OnInit {

  usuario: Usuario = null;
  locais: Local[] = null;
  responsiveOptions: any = [];

  constructor(
    private authService: AuthenticationService,
    private localService: LocalService,
    private interesseService: InteresseService,
    private avaliacaoService: AvaliacaoService,
    private usuarioService: UsuarioService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    this.retrieveUser();
    this.buildOptionsCarosel();
    this.loadLocais();
  }



  concluirCadastro(){
    // this.usuarioService.concluirCadastro(this.usuario.id).subscribe(
    //   usuario => this.actionForSuccessConcluirCadastro(usuario),
    //   error => this.actionForErrorConcluirCadastro(error)
    // );
    
    this.usuarioService.concluirCadastro(this.usuario).subscribe(
      usuario => this.actionForSuccessConcluirCadastro(usuario),
      error => this.actionForErrorConcluirCadastro(error)
    );
  }



  setInterestList(id: string) {
    if (id != null && id != '' ){
      let interesse = new Interesse();
      interesse.localId = id;
      interesse.usuarioId = this.usuario.id;
      this.interesseService.create(interesse).subscribe(
        success => this.actionForSuccessSetList(success),
        error => this.actionForErrorSetList(error)
      );
    }
  }


  onRate(e, avaliacaoId, localId){
    const aval = new Avaliacao();
    aval.id = avaliacaoId;
    aval.usuarioId = this.usuario.id;
    aval.localId = localId;
    aval.nota = e.value;
    
    if(aval.id == ''){
      this.avaliacaoService.create(aval).subscribe(
        aval => this.actionsForSuccess(aval),
        error => this.actionsForError(error)
      );
    }else{
      this.avaliacaoService.update(aval).subscribe(
        aval => this.actionsForSuccess(aval),
        error => this.actionsForError(error)
      );
    }
  }







  // Methods Privates
  private actionForSuccessConcluirCadastro(usuario){
    if (usuario != null){
      this.authService.setCurrentUser(usuario);
      this.usuario = usuario;
      this.router.navigate(['main','home']);
    }else{
      this.router.navigate(['main','rating']);
    }
  }



  private actionForErrorConcluirCadastro(error){
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



  private actionForSuccessSetList(success: Interesse): void {
    Swal.fire({
      icon: 'success',
      position: 'top-right',
      showConfirmButton: false,
      text: 'Lista de Interesses atualizada com sucesso!',
      toast: true,
      timer: 3000
    });
  }


  private actionsForSuccess(avaliacao: Avaliacao) {
    this.locais.forEach(element => {
      if(element.id == avaliacao.localId){
        element.avaliacao = avaliacao;
      }
    });
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




  private actionForErrorSetList(error: any): void {
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



  private buildOptionsCarosel(){
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
    ];
  }


  private retrieveUser(){
    this.usuario = this.authService.getCurrentUser();
  }


  private loadLocais() {
    this.usuario = this.authService.getCurrentUser();
    if(this.usuario == null){
      this.localService.getAll().subscribe(
        locais => this.actionsForSuccessLoadLocais(locais),
        error => this.actionsForErrorLoadLocais(error)
      )
    }else{
      this.localService.getAllByUsuario(this.usuario.id).subscribe(
        locais => this.actionsForSuccessLoadLocais(locais),
        error => this.actionsForErrorLoadLocais(error)
      )
    }
  }


  private actionsForSuccessLoadLocais(locais: Local[]) {
    this.locais = locais;
    this.getImage();
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


  private getImage(){
    this.locais.forEach(x => {
      this.localService.getImage(x.id).subscribe(
        data => this.actionForSuccessGetImage64(data, x),
        error => this.actionForError(error)
      );      
    });
  }


  private actionForSuccessGetImage64(data: Blob, local: Local){

    let blob: any = new Blob([data], { type: 'application/jpg' });
    let url= window.URL.createObjectURL(blob);
    
    let objectURL = 'data:image/jpeg;base64,' + url;
    local.imagem = this.sanitizer.bypassSecurityTrustUrl(url);
  }

  
  private actionForError(error: any){
    console.log('erro', error.error);
  }


}
