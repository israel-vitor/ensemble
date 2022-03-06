import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { SignUpComponent } from './components/sign-up/sign-up.component'
import { HomeComponent } from './components/home/home.component'
import { ServicosComponent } from './components/servicos/servicos.component'
import { PerfilComponent } from './components/perfil/perfil.component'
import { GrupoComponent } from './components/grupo/grupo.component'
import { MeusGruposComponent } from './components/meus-grupos/meus-grupos.component'
import { CriarGrupoComponent } from './components/criar-grupo/criar-grupo.component'
import { ActivateAccountComponent } from './components/activate-account/activate-account.component'
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id', component: GrupoComponent, canActivate: [AuthGuard] },
  { path: 'criar-grupo', component: CriarGrupoComponent, canActivate: [AuthGuard] },
  { path: 'meus-grupos', component: MeusGruposComponent, canActivate: [AuthGuard] },
  { path: 'admin/servicos', component: ServicosComponent, canActivate: [AuthGuard] },
  { path: 'ativar-conta/:token', component: ActivateAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
