import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ServicosComponent } from './components/servicos/servicos.component';
import { GrupoComponent } from './components/grupo/grupo.component';
import { CriarGrupoComponent } from './components/criar-grupo/criar-grupo.component';
import { MeusGruposComponent } from './components/meus-grupos/meus-grupos.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServicesFormComponent } from './components/services-form/services-form.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { ToastsContainer } from './components/toasts-container/toasts-container.component';
import {authInterceptorProviders} from "./interceptors/auth.interceptor";
import { CreateGroupFormComponent } from './components/create-group-form/create-group-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ToolbarComponent,
    HomeComponent,
    PerfilComponent,
    ServicosComponent,
    GrupoComponent,
    CriarGrupoComponent,
    MeusGruposComponent,
    ServicesFormComponent,
    ActivateAccountComponent,
    ToastsContainer,
    CreateGroupFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
