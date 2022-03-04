import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { SignUpComponent } from './components/sign-up/sign-up.component'
import { HomeComponent } from './components/home/home.component'
import { ServicosComponent } from './components/servicos/servicos.component'
import { PerfilComponent } from './components/perfil/perfil.component'
import { GrupoComponent } from './components/grupo/grupo.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: SignUpComponent },
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'grupo', component: GrupoComponent },
  { path: 'admin/servicos', component: ServicosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
