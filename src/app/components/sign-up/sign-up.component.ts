import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../interfaces/user';
import {ToastService} from "../../services/toast/toast.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: User = {
    email: '',
    document: '',
    name: '',
    username: '',
    birthDate: '',
    password: ''
  }

  confirmPassword: string = ''
  token: string = ''

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    public toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.authService.logout()
  }

  public signUp(modal: any): void {
    const erros = []
    if(!this.valid_email()) erros.push('Você deve inserir um Email válido')
    if(!this.valid_cpf()) erros.push('Você deve inserir um CPF válido')
    if(!this.confirm_password()) erros.push('As senhas inseridas não são iguais')
    if(erros.length > 0){
      erros.forEach(element => {
        this.toastService.showError(element);
      });
      return
    }

    this.authService.signUp(this.user).then(() => {
      this.toastService.showSuccess('Conta criada com sucesso');
      this.modalService.open(modal, {backdrop: 'static'})
    }).catch(() => {
      this.toastService.showError('Ocorreu um erro ao realizar seu cadastro');
    })
  }

  public cpf_mask(element: any): void{
    element.target.value = element.target.value.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') 
  }

  public valid_cpf(): boolean{
    if(!this.test_cpf(this.user.document)){
      return false
    }
    return true
  }

  public valid_email(): boolean{
    const re = /\S+@\S+\.\S+/;
    if(!re.test(this.user.email)){
      return false
    }
    return true
  }

  public confirm_password(): boolean{
    if(this.user.password != this.confirmPassword){
      return false
    }
    return true
  }

  public test_cpf(cpf:string): boolean {
    let numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11) return false;
    for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    }
    if (!digitos_iguais) {
        numeros = cpf.substring(0,9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--) {
            soma += parseInt(numeros.charAt(10 - i)) * i;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != parseInt(digitos.charAt(0))) {
            return false;
        }
        numeros = cpf.substring(0,10);
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
}
