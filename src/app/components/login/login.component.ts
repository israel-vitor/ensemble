import { Component, OnInit } from '@angular/core';
import {User} from '../../interfaces/user';
import { AuthService } from '../../services/auth/auth.service';
import {Router} from "@angular/router";
import {SessionService} from "../../services/session/session.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = {
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
  }

  // TODO: add error handler
  public login(): void {
    this.authService.login(this.user).subscribe(
      data => {
        this.sessionService.saveToken(data.token);
        this.sessionService.saveRefreshToken(data.token);
        this.router.navigate(['/home'])
      }
    );
  }

}
