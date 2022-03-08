import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../services/group/group.service";
import {Group} from "../../interfaces/group";
import {ToastService} from "../../services/toast/toast.service";
import {Router} from "@angular/router";
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  groups: Group[] = []

  constructor(
    private groupService: GroupService,
    private toastService: ToastService,
    private router: Router,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.loadGroups()
  }

  loadGroups() {
    this.groupService.getAllGroups().then(({groups}) => {
      this.groups = groups.map((group: Group) => {
        return {
          ...group,
          service: {
            ...group.service, 
            thumbnail: this.commonService.getImageUrl(group?.service?.thumbnail, 'services')
          },
        }
      }).filter(({usersLeft = 0}) => usersLeft > 0)
    }).catch(() => {
      this.toastService.showError('Erro ao carregar os grupos');
    })
  }

  showDetails(groupId?: number) {
    this.router.navigate([`/grupo/${groupId}`])
  }

}
