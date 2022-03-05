import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {ToastService} from "../../services/toast/toast.service";

@Component({
  selector: 'app-activate-account',
  template: '<app-toasts aria-live="polite" aria-atomic="true"></app-toasts>',
  styles: []
})
export class ActivateAccountComponent implements OnInit {

  token: string

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    public toastService: ToastService
  ) {
    this.token = this.route.snapshot.paramMap.get('token') || ''
  }

  ngOnInit(): void {
    this.activateUser()
  }

  activateUser(): void {
    this.authService.activate(this.token).then(() => {
      this.toastService.showSuccess('Sua conta foi ativada com sucesso. Efetue o login pra continuar');
    }).catch(() => {
      this.toastService.showError('Ocorreu um erro ao ativar sua conta');
    }).finally(() => {
      this.router.navigate(['/login'])
    })
  }

}
