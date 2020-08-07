import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { PasswordModule } from 'primeng/password';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { HomeComponent } from './pages/external/home/home.component';
import { LoginComponent } from './pages/external/login/login.component';
import { MainComponent } from './pages/external/main/main.component';
import { LocalComponent } from './pages/internal/local/local.component';
import { RegisterComponent } from './pages/external/register/register.component';
import { LocalFormComponent } from './pages/internal/local/local-form/local-form.component';
import { InternalMainComponent } from './pages/internal/internal-main/internal-main.component';
import { UsuarioComponent } from './pages/internal/usuario/usuario.component';
import { UsuarioFormComponent } from './pages/internal/usuario/usuario-form/usuario-form.component';
import { RegisterRatingComponent } from './pages/internal/register-rating/register-rating.component';
import { BeginComponent } from './pages/external/begin/begin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    LocalComponent,
    RegisterComponent,
    LocalFormComponent,
    InternalMainComponent,
    UsuarioComponent,
    UsuarioFormComponent,
    RegisterRatingComponent,
    BeginComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RatingModule,
    FormsModule,
    CarouselModule,
    CardModule,
    PasswordModule,
    ToggleButtonModule,
    TableModule,
    FileUploadModule,
    DropdownModule,
    BrowserAnimationsModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
