import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalService } from 'src/app/shared/service/local.service';
import { Local } from 'src/app/shared/model/local.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Avaliacao } from 'src/app/shared/model/avaliacao.model';
import { AvaliacaoService } from 'src/app/shared/service/avaliacao.service';
import { Interesse } from 'src/app/shared/model/interesse';
import { InteresseService } from 'src/app/shared/service/interesse.service';


@Component({
  selector: 'app-local-form',
  templateUrl: './local-form.component.html',
  styleUrls: ['./local-form.component.css']
})
export class LocalFormComponent implements OnInit {

  usuario: Usuario;
  formCadastro: FormGroup;
  uploadedFiles: any[] = [];
  imageURL: string;
  uploadForm: FormGroup;
  image: ArrayBufferTypes;
  thumbnail: any;
  localId: string = '';
  action: string;
  avaliacao: Avaliacao = null;
  isInitalRating: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private localService: LocalService,
    private avaliacaoService: AvaliacaoService,
    private interesseService: InteresseService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.buildAction();
    this.retrieveUser();
    this.buildForm();
    this.loadLocal();
    //this.getImage();
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
  
  
  



  onSubmitForm(){
    if (this.formCadastro.valid) {
      const url = this.route.snapshot.url;
      
      if (this.action == 'new')
        this.createLocal();

      if (this.action == 'edit')
        this.updateLocal();
    }
  }
  



onFileSelected(event) {
        
  if (this.formCadastro.get('id').value == ''){
    Swal.fire({
      icon: 'warning',
      title: 'Atenção',
      text: 'É necessário salvar um local para carregar a imagem'
    });

  }else{

    var fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      
      var file: File = fileList[0];
      var usuario: Usuario = this.authService.getCurrentUser();
      var formData:FormData = new FormData();
      let id = this.route.snapshot.params['id'];
      
      formData.append('imagem', file, file.name);
      formData.append('localId', id);
      
      this.localService.uploadImage(formData).subscribe(
        success => this.actionsForSuccessUpload(),
        error => this.actionsForErrorUpload(error)
     )

    }else{
      this.actionsForErrorUpload('Nenhum arquivo selecionado');
    }
  }
}



  // Private Methods
  private buildAction(){
    this.isInitalRating = this.route.snapshot.url[0].path == 'rating' ? true : false;
    console.log(this.isInitalRating)
    this.action = this.route.snapshot.url[1].path;
  }



  
  private actionsForSuccess(avaliacao: Avaliacao) {
    this.formCadastro.patchValue(avaliacao);
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

 
  
  
  private actionsForError(error: any): void {
    let swalOpt: any = {
      title: 'Erro'
    };
    
    if (error.status === 0) {
      swalOpt.imageUrl = '../assets/images/cloud-off.png';
      swalOpt.imageHeight = 100;
      swalOpt.text = 'Não foi possível comunicar com o servidor';
    } else {
      swalOpt.icon = 'error';
      swalOpt.text = 'Não conseguimos salvar sua avaliação'
    }

    Swal.fire(swalOpt);
  }
  



  private createLocal(){
    const local: Local = this.formCadastro.value;

    this.localService.create(local).subscribe(
      local => this.actionsForSuccessCreateLocal(local),
      error => this.actionsForErrorSubmitForm(error)
    )
  }


  private getImage(){
    const localId = this.route.snapshot.params['id'].toString();
    this.localService.getImage(localId).subscribe(
      data => this.actionForSuccessGetImage64(data),
      error => this.actionForError(error)
    );
  }


  



  private getImage64(){
    this.localService.getImage64().subscribe(
      data => this.actionForSuccessGetImage64(data),
      error => this.actionForError(error)
    );
  }



  private actionsForErrorUpload(error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: error.error
    });
  }


  private actionsForSuccessUpload() {

    this.getImage();

    Swal.fire({
      icon: 'success',
      position: 'top-right',
      showConfirmButton: false,
      text: 'Imagem carregada com sucesso!',
      toast: true,
      timer: 3000
    });
  }


  
  private actionsForSuccessCreateLocal(local: Local) {
    this.formCadastro.get('id').setValue(local.id);
    
    this.router.navigate(['main', 'local', local.id]);

    Swal.fire({
      icon: 'success',
      position: 'top-right',
      showConfirmButton: false,
      text: 'Local salvo com sucesso!',
      toast: true,
      timer: 3000
    });
  }


  private actionsForErrorSubmitForm(error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: error.error
    });
  }


  private updateLocal(){
    const local: Local = this.formCadastro.value;

    this.localService.update(local).subscribe(
      local => this.actionsForSuccessUpdateLocal(local),
      error => this.actionsForErrorUpdateLocal(error)
    )
  }


  private actionsForSuccessUpdateLocal(local: Local) {
    this.formCadastro.get('id').setValue(local.id);
    
    Swal.fire({
      icon: 'success',
      position: 'top-right',
      showConfirmButton: false,
      text: 'Local alterado com sucesso!',
      toast: true,
      timer: 3000
    });
  }


  private actionsForErrorUpdateLocal(error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: error.error
    });
  }



  private retrieveUser(){
    this.usuario = this.authService.getCurrentUser();
  }


  private loadLocal(){
    console.log(this.action);

    if (this.action == 'view') {
      if (this.usuario != null) {

        let id = this.route.snapshot.params['id'];
        this.localService.getByLocalAndUsuario(id, this.usuario.id).subscribe(
          local => this.actionForSuccessLoadLocal(local),
          error => this.actionForErrorLoadLocal(error)
        );
      }else{
        let id = this.route.snapshot.params['id'];
        this.localService.get(id).subscribe(
          local => this.actionForSuccessLoadLocal(local),
          error => this.actionForErrorLoadLocal(error)
        );
      }
    }

    if (this.action == 'edit'){
      let id = this.route.snapshot.params['id'];
      this.localService.get(id).subscribe(
        local => this.actionForSuccessLoadLocal(local),
        error => this.actionForErrorLoadLocal(error)
      );
    }  
    
    if (this.action == 'new'){
      this.formCadastro.get('imagem').value;
    }
  }


  private actionForError(error: any){
    console.log('erro', error.error)
  }


  private setFormValues(local: Local){
    this.formCadastro.get('id').setValue(local.id);
    this.formCadastro.get('nome').setValue(local.nome);
    this.formCadastro.get('telefone').setValue(local.telefone);
    this.formCadastro.get('cep').setValue(local.cep);
    this.formCadastro.get('rua').setValue(local.rua);
    this.formCadastro.get('numero').setValue(local.numero);
    this.formCadastro.get('complemento').setValue(local.complemento);
    this.formCadastro.get('bairro').setValue(local.bairro);
    this.formCadastro.get('cidade').setValue(local.cidade);
    this.formCadastro.get('uf').setValue(local.uf);
    this.formCadastro.get('pais').setValue(local.pais);
    this.formCadastro.get('descricao').setValue(local.descricao);
    if (local.avaliacao != null){
      this.formCadastro.get('avaliacao').setValue(local.avaliacao);
      this.formCadastro.get('avaliacao.id').setValue(local.avaliacao.id);
      this.formCadastro.get('avaliacao.usuarioId').setValue(local.avaliacao.usuarioId);
      this.formCadastro.get('avaliacao.localId').setValue(local.avaliacao.localId);
      this.formCadastro.get('avaliacao.nota').setValue(local.avaliacao.nota);
    }
  }


  private actionForSuccessLoadLocal(local: Local) {
    this.setFormValues(local);
    this.getImage();
  }

  private actionForSuccessGetImage(data: any){
    let blob: any = new Blob([data], { type: 'image/png'}); //application/octent-stream' });

    const reader = new FileReader();
    
    reader.addEventListener("load", () => {
      this.thumbnail = reader.result;
   }, false);

   reader.readAsDataURL(blob);   
  }

  private actionForSuccessGetImage64(data: Blob){

    let blob: any = new Blob([data], { type: 'application/jpg' });
    const url= window.URL.createObjectURL(blob);
    
    let objectURL = 'data:image/jpeg;base64,' + url;
    this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(url);
    this.formCadastro.get('imagem').setValue(this.sanitizer.bypassSecurityTrustUrl(url));
  }


  private actionForErrorLoadLocal(error: any) {
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
      telefone:['', [Validators.required]],
      cep:['', [Validators.required]],
      rua: ['', [Validators.required]],
      numero:['', [Validators.required]],
      complemento:[''],
      bairro:['', [Validators.required]],
      cidade:['', [Validators.required]],
      uf:['', [Validators.required]],
      pais:['', [Validators.required]],
      descricao:['', [Validators.required]],
      nomeImagem: [''],
      imagem: [''],
      avaliacao: this.fb.group({
        id: [''],
        usuarioId: [''],
        localId: [''],
        nota:[0]
      }),
    });
  }
}
