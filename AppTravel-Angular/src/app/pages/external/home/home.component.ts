import { Component, OnInit } from '@angular/core';
import { Local } from 'src/app/shared/model/local.model';
import { LocalService } from 'src/app/shared/service/local.service';
import Swal from 'sweetalert2';
import { Avaliacao } from 'src/app/shared/model/avaliacao.model';
import { FormGroup } from '@angular/forms';
import { AvaliacaoService } from 'src/app/shared/service/avaliacao.service';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Interesse } from 'src/app/shared/model/interesse';
import { InteresseService } from 'src/app/shared/service/interesse.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  
  usuario: Usuario;
  
  locais: Local[] = [];
  locaisHint: Local[] = [];
  lstInteresses: Local[] = [];
  locaisFiltro: Local[] = [];
  
  form: FormGroup;
  
  responsiveOptions: any = [];
  responsiveOptionsInterest: any = [];
  responsiveOptionsHint: any = [];
    
  visible: number = 0;
  visibleInterest: number = 0;
  visibleHint: number = 0;
  
  selectedCidadeFiltro: string = 'Todas Cidades';
  cidadesFiltro: any = [{label: 'Todas Cidades', value: 'Todas Cidades'}];
  


  constructor(
    private authService: AuthenticationService,
    private avaliacaoService: AvaliacaoService,
    private localService: LocalService,
    private interesseService: InteresseService,
    private sanitizer: DomSanitizer) { }




  ngOnInit() {
    this.retrieveUser();
    this.buildOptionsCarosel();
    this.loadLocais();
    this.loadInterestList();
    this.getHint();
    this.setOptionsCarousel();
    this.setOptionsCarouselInterest();
    this.setOptionsCarouselHint();
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



  onFilter(e){
    this.loadLocaisFiltro(e.value);
  }





  // Privates Methods
  private loadLocaisFiltro(filtro: string){
    if (filtro == 'Todas Cidades'){
      this.locaisFiltro = this.locais;
    }else{
      this.locaisFiltro = [];
      this.locais.forEach(x => {
        let cidade = `${x.cidade.toLowerCase()} - ${x.uf.toLowerCase()}`
        if (cidade == filtro){
          this.locaisFiltro.push(x);
        }
      });
    }
    this.visible = 0;
    this.setOptionsCarousel();
  }


  private setOptionsCarousel(){
    switch (this.locaisFiltro.length) {
      case 1:
        this.visible = 1;
        this.responsiveOptions = [
          {
              breakpoint: '1024px',
              numVisible: 1,
              numScroll: 1          
          },
          {
              breakpoint: '768px',
              numVisible: 1,
              numScroll: 1
          },
          {
              breakpoint: '560px',
              numVisible: 1,
              numScroll: 1
          }
        ];
      break;

      case 2:
        this.visible = 2;
        this.responsiveOptions = [
          {
              breakpoint: '1024px',
              numVisible: 2,
              numScroll: 1          
          },
          {
              breakpoint: '768px',
              numVisible: 2,
              numScroll: 1
          },
          {
              breakpoint: '560px',
              numVisible: 1,
              numScroll: 1
          }
        ];
      break;

      case 3:
        this.visible = 3;
        this.responsiveOptions = [
          {
              breakpoint: '1024px',
              numVisible: 3,
              numScroll: 1          
          },
          {
              breakpoint: '768px',
              numVisible: 2,
              numScroll: 1
          },
          {
              breakpoint: '560px',
              numVisible: 1,
              numScroll: 1
          }
        ];
      break;
          
      default:
        this.visible = 4;
        this.responsiveOptions = [
          {
              breakpoint: '1024px',
              numVisible: 4,
              numScroll: 1          
          },
          {
              breakpoint: '768px',
              numVisible: 2,
              numScroll: 1
          },
          {
              breakpoint: '560px',
              numVisible: 1,
              numScroll: 1
          }
        ];
      break;
    }    
  }

  private setOptionsCarouselInterest(){

    switch (this.lstInteresses.length) {
      case 0:
        this.visibleInterest = 0;
      break;

      case 1:
        this.visibleInterest = 1;
        this.responsiveOptionsInterest = [
          {
              breakpoint: '1024px',
              numVisible: 1,
              numScroll: 1          
          },
          {
              breakpoint: '768px',
              numVisible: 1,
              numScroll: 1
          },
          {
              breakpoint: '560px',
              numVisible: 1,
              numScroll: 1
          }
        ];
      break;

      case 2:
        this.visibleInterest = 2;
        this.responsiveOptionsInterest = [
          {
              breakpoint: '1024px',
              numVisible: 2,
              numScroll: 1          
          },
          {
              breakpoint: '768px',
              numVisible: 2,
              numScroll: 1
          },
          {
              breakpoint: '560px',
              numVisible: 1,
              numScroll: 1
          }
        ];
      break;

      case 3:
        this.visibleInterest = 3;
        this.responsiveOptionsInterest = [
          {
              breakpoint: '1024px',
              numVisible: 3,
              numScroll: 1          
          },
          {
              breakpoint: '768px',
              numVisible: 2,
              numScroll: 1
          },
          {
              breakpoint: '560px',
              numVisible: 1,
              numScroll: 1
          }
        ];
      break;
          
      default:
        this.visibleInterest = 4;
        this.responsiveOptionsInterest = [
          {
              breakpoint: '1024px',
              numVisible: 4,
              numScroll: 1          
          },
          {
              breakpoint: '768px',
              numVisible: 2,
              numScroll: 1
          },
          {
              breakpoint: '560px',
              numVisible: 1,
              numScroll: 1
          }
        ];
      break;
    }    
  }


  private setOptionsCarouselHint(){

    switch (this.lstInteresses.length) {
      case 0:
        this.visibleHint = 0;
      break;

      case 1:
        this.visibleHint = 1;
        this.responsiveOptionsHint = [
          {
              breakpoint: '1024px',
              numVisible: 1,
              numScroll: 1          
          },
          {
              breakpoint: '768px',
              numVisible: 1,
              numScroll: 1
          },
          {
              breakpoint: '560px',
              numVisible: 1,
              numScroll: 1
          }
        ];
      break;

      case 2:
        this.visibleHint = 2;
        this.responsiveOptionsHint = [
          {
              breakpoint: '1024px',
              numVisible: 2,
              numScroll: 1          
          },
          {
              breakpoint: '768px',
              numVisible: 2,
              numScroll: 1
          },
          {
              breakpoint: '560px',
              numVisible: 1,
              numScroll: 1
          }
        ];
      break;

      case 3:
        this.visibleHint = 3;
        this.responsiveOptionsHint = [
          {
              breakpoint: '1024px',
              numVisible: 3,
              numScroll: 1          
          },
          {
              breakpoint: '768px',
              numVisible: 2,
              numScroll: 1
          },
          {
              breakpoint: '560px',
              numVisible: 1,
              numScroll: 1
          }
        ];
      break;
          
      default:
        this.visibleHint = 4;
        this.responsiveOptionsHint = [
          {
              breakpoint: '1024px',
              numVisible: 4,
              numScroll: 1          
          },
          {
              breakpoint: '768px',
              numVisible: 2,
              numScroll: 1
          },
          {
              breakpoint: '560px',
              numVisible: 1,
              numScroll: 1
          }
        ];
      break;
    }    
  }



  private retrieveUser(){
    this.usuario = this.authService.getCurrentUser();
  }



  private loadInterestList(){
    this.usuario = this.authService.getCurrentUser();
    if(this.usuario != null){
      this.interesseService.getInterestListByUsuario(this.usuario.id).subscribe(
        locais => this.actionsForSuccessLoadInterestList(locais),
        error => this.actionsForError(error)
      )
    }
    this.visibleInterest = 0;
    this.setOptionsCarouselInterest();
  }


  private actionsForSuccessLoadInterestList(locais: Local[]){
    this.lstInteresses = locais;
    this.visibleInterest = 0;
    this.setOptionsCarouselInterest();
    this.getImageInterest();
  }




  private actionForSuccessSetList(success: Interesse) {
    this.loadInterestList();
    Swal.fire({
      icon: 'success',
      position: 'top-right',
      showConfirmButton: false,
      text: 'Lista de Interesses atualizada com sucesso!',
      toast: true,
      timer: 3000
    });
  }


  
  private actionForErrorSetList(error: any) {
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

    Swal.fire(swalOpt);
  }




  private getHint(){
    if(this.usuario != null){
      this.localService.getHint(this.usuario.id).subscribe(
        locais => this.actionsForSuccessLoadLocaisHint(locais),
        error => this.actionsForErrorLoadLocaisHint(error)
      )
    }
    this.visibleHint = 0;
    this.setOptionsCarouselHint();
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



  private getImageInterest(){
    this.lstInteresses.forEach(x => {
      this.localService.getImage(x.id).subscribe(
        data => this.actionForSuccessGetImage64(data, x),
        error => this.actionForError(error)
      );      
    });
  }
  


  private getImage(){
    this.locais.forEach(x => {
      this.localService.getImage(x.id).subscribe(
        data => this.actionForSuccessGetImage64(data, x),
        error => this.actionForError(error)
      );      
    });
  }


  private getImageHint(){
    this.locaisHint.forEach(x => {
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
    //console.log('erro', error.error);
  }



  private actionsForSuccessLoadLocais(locais: Local[]) {
    this.locais = locais;
    this.locaisFiltro = locais;
    locais.forEach(x => {
      let exist = 0;
      this.cidadesFiltro.forEach(c => {
        let cidade = `${x.cidade} - ${x.uf}`;
        if(c.value == cidade.toLowerCase())
          exist++;
      });
      if (exist == 0) {
        let cidade = `${x.cidade} - ${x.uf}`;
        this.cidadesFiltro.push({label: cidade, value: cidade.toLowerCase()});
      }
    });
    // this.cidadesFiltro = this.cidadesFiltro.sort();
    this.getImage();
  }


  private actionsForSuccessLoadLocaisHint(locais: Local[]) {
    this.locaisHint = locais;
    this.getImageHint();
  }





  


  private buildOptionsCarosel(){
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 4,
          numScroll: 1          
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


  private actionsForSuccess(avaliacao: Avaliacao) {
    this.locais.forEach(element => {
      if(element.id == avaliacao.localId){
        element.avaliacao = avaliacao;
      }
    });
    this.loadInterestList();
    this.getHint();
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
