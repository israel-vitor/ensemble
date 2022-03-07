import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { GroupPagineted } from 'src/app/interfaces/group.pagineted';
import { CommonService } from 'src/app/services/common/common.service';
import { GroupService } from 'src/app/services/group/group.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-servicos',
  templateUrl: './meus-grupos.component.html',
  styleUrls: ['./meus-grupos.component.scss']
})
export class MeusGruposComponent implements OnInit {
  API_URL = `${environment.apiUrl}/auth`
  owner_groups: any;
  member_groups: any;
  isAdmin:boolean = false; 

  constructor(
    private router: Router,
    private groupService: GroupService,
    private commonService: CommonService,
  ) { }

  async ngOnInit(){
    const pageGroups = await this.groupService.getAllGroupsUserMember();
    this.member_groups = pageGroups.groups.map((group: GroupPagineted)=>({
      ...group,
      thumbnail: this.commonService.getImageUrl(group.service.thumbnail, 'services')
    }))
    
  }

  async view_div(div: string) {
    const btn_membro = document.getElementById('btn_membro')
    const btn_admin = document.getElementById('btn_admin')
    if(div == 'membro'){
      this.isAdmin = false
      btn_membro?.classList.add('bg-info-mod')
      btn_membro?.classList.remove('no-bg')
      btn_admin?.classList.remove('bg-info-mod')
      btn_admin?.classList.add('no-bg')
    } else if (div == 'admin'){
      const pageGroups = await this.groupService.getAllGroupsUserAdministrator();
      this.owner_groups = pageGroups.groups.map((group: GroupPagineted)=>({
        ...group,
        thumbnail: this.commonService.getImageUrl(group.service.thumbnail, 'services')
      }))

      this.isAdmin = true
      btn_membro?.classList.remove('bg-info-mod')
      btn_membro?.classList.add('no-bg')
      btn_admin?.classList.remove('no-bg')
      btn_admin?.classList.add('bg-info-mod')
    }
  }

  showDetails(groupId: number) {
    this.router.navigate([`/grupo/${groupId}`])
  }

}
