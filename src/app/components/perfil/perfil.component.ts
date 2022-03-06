import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public isEdit: boolean = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  public logout(): void {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
