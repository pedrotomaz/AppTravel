import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/external/main/main.component';
import { HomeComponent } from './pages/external/home/home.component';
import { LoginComponent } from './pages/external/login/login.component';
import { LocalComponent } from './pages/internal/local/local.component';
import { RegisterComponent } from './pages/external/register/register.component';
import { LocalFormComponent } from './pages/internal/local/local-form/local-form.component';
import { InternalMainComponent } from './pages/internal/internal-main/internal-main.component';
import { UsuarioComponent } from './pages/internal/usuario/usuario.component';
import { UsuarioFormComponent } from './pages/internal/usuario/usuario-form/usuario-form.component';
import { RegisterRatingComponent } from './pages/internal/register-rating/register-rating.component';
import { BeginComponent } from './pages/external/begin/begin.component';


const routes: Routes = [
  { path: '', component: MainComponent ,
    children: [
      { path: '', component: BeginComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  { path: 'main', component: InternalMainComponent,
  children: [
      { path: 'local', component: LocalComponent },
      { path: 'local/edit/:id', component: LocalFormComponent },
      { path: 'local/view/:id', component: LocalFormComponent },
      { path: 'local/new', component: LocalFormComponent },
      { path: 'home', component: HomeComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'usuario/edit/:id', component: UsuarioFormComponent },
      { path: 'usuario/new', component: UsuarioFormComponent },
      { path: 'rating', component: RegisterRatingComponent },
      { path: 'rating/view/:id', component: LocalFormComponent } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
