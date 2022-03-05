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
  }

  public signUp(modal: any): void {
    // TODO: add mask to document field
    // TODO: add logic to confirm password field
    // TODO: add validation to email field
    this.authService.signUp(this.user).then(() => {
      this.toastService.showSuccess('Conta criada com sucesso');
      this.modalService.open(modal, {backdrop: 'static'})
    }).catch(() => {
      this.toastService.showSuccess('Ocorreu um erro ao realizar seu cadastro');
    })
  }

}
