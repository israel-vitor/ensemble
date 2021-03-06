import {Component, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from "@angular/router";
import {SessionService} from "../../services/session/session.service";
import {ToastService} from "../../services/toast/toast.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = {
    email: '',
    password: '',
    document: '000.000.000.00'
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService,
    public toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.authService.logout()
  }

  public login(): void {
    this.authService.login(this.user).then(async data => {
      this.sessionService.saveToken(data.token);
      this.sessionService.saveRefreshToken(data.refreshToken);
      const userData = await this.authService.getInfo()
      const { roles = [] } = userData
      const isAdmin = roles.includes('Admin')
      this.sessionService.saveUser(userData)
      isAdmin ? this.router.navigate(['/admin/servicos']) : this.router.navigate(['/home'])
    }).catch((e) => {
      this.toastService.showError('Houve um erro ao realizar o login!');
    });

  }

}
