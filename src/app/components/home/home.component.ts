import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../services/group/group.service";
import {Group} from "../../interfaces/group";
import {ToastService} from "../../services/toast/toast.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  groups: Group[] = []

  constructor(
    private groupService: GroupService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadGroups()
    this.authService.refreshToken().toPromise().then(response => {
      console.log(response)
    })
  }

  loadGroups() {
    this.groupService.getAllGroups().then(({groups}) => {
      console.log(groups)
      this.groups = groups
    }).catch(() => {
      this.toastService.showError('Erro ao carregar os grupos');
    })
  }

  showDetails(groupId: number) {
    this.router.navigate([`/grupo/${groupId}`])
  }

}
