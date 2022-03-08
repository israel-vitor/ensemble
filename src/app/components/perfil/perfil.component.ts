import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {ToastService} from "../../services/toast/toast.service";
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public isEdit: boolean = false;

  storage_user: User = {
    email: '',
    document: '',
    birthDate: '',
    name: ''
  }

  update_user: User = {
    email: '',
    document: '',
    birthDate: '',
    name: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadPerfil()
  }

  public logout(): void {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  public loadPerfil(): void{
    this.authService.getUserInfo().then(user => {
      this.update_user = {...user};
      this.storage_user = {...user};
    }).catch(() => {
      this.toastService.showError('Erro ao carregar o perfil');
      this.router.navigate(['/home'])
    })
  }

  public switchIsEdit(func: string): void{
    this.isEdit = !this.isEdit
    if(func == 'cancel'){
      this.update_user = {...this.storage_user};
    }
  }

  public updatePerfil(): void{
    this.authService.updateUser(this.update_user).then(user => {
      const erros = []
      if(!this.valid_email()) erros.push('Você deve inserir um Email válido')
      if(!this.valid_cpf()) erros.push('Você deve inserir um CPF válido')
      if(erros.length > 0){
        erros.forEach(element => {
          this.toastService.showError(element);
        });
        return
      }
      this.update_user = {...user}
      this.storage_user = {...user}
      this.toastService.showSuccess('Dados atualizados com sucesso');
      this.switchIsEdit('')
    }).catch(() => {
      this.toastService.showError('Ocorreu um erro ao atualizar o perfil');
    })
  }

  public valid_cpf(): boolean{
    if(!this.test_cpf(this.update_user.document)){
      return false
    }
    return true
  }

  public valid_email(): boolean{
    const re = /\S+@\S+\.\S+/;
    if(!re.test(this.update_user.email)){
      return false
    }
    return true
  }

  public test_cpf(cpf:string): boolean {
    let _cpf = cpf.replace('.','').replace('.','').replace('-','')
    let numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (_cpf.length < 11) return false;
    for (i = 0; i < _cpf.length - 1; i++) {
        if (_cpf.charAt(i) != _cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    }
    if (!digitos_iguais) {
        numeros = _cpf.substring(0,9);
        digitos = _cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--) {
            soma += parseInt(numeros.charAt(10 - i)) * i;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != parseInt(digitos.charAt(0))) {
            return false;
        }
        numeros = _cpf.substring(0,10);
        soma = 0;
        for (i = 11; i > 1; i--) {
            soma += parseInt(numeros.charAt(11 - i)) * i;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != parseInt(digitos.charAt(1))) {
            return false;
        }
        return true;
    }
    return false;
  }

  public cpf_mask(element: any): void{
    element.target.value = element.target.value.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }
}
