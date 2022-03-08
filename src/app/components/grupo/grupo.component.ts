import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GroupService} from "../../services/group/group.service";
import {ToastService} from "../../services/toast/toast.service";
import {SessionService} from "../../services/session/session.service";
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit {

  isOwner: boolean = true;
  requestedGroup: boolean = false
  requestType: string = ''
  group_id: string = ''
  group = {
    name: '',
    service: {
      name: ''
    },
    plan: {
      price: 0,
      description: '',
      usersNumber: 1
    },
    owner: {
      id: ''
    },
    users: [{}]
  }
  thumbnail: string = ''
  user = {
    sub: -1,
    email: ''
  }
  request_users = [
    {
      id: 0,
      status: 'R', 
      user: {
        id: -1,
        name: ''
      }
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private toastService: ToastService,
    private sessionService: SessionService,
    private commonService: CommonService,
    private router: Router
  ) {
    this.group_id = this.route.snapshot.paramMap.get('id') || ''
  }

  ngOnInit(): void {
    this.loadGroup()
  }

  public loadGroup(): void{
    this.groupService.getGroupById(this.group_id).then((group) => {
      this.group = group
      this.request_users = group.requests
      this.thumbnail = this.commonService.getImageUrl(group.service.thumbnail, 'services')
      this.verifyOwner()
      this.verifyRequest(group)
    }).catch(() => {
      this.toastService.showError('Erro ao carregar o grupo')
    })
  }

  public verifyOwner(){
    this.user = this.sessionService.getUser()
    if(this.user.sub == parseInt(this.group.owner.id)){
      this.isOwner = true
    } else {
      this.isOwner = false
    }
  }

  public verifyRequest(group: any){
    this.requestedGroup = group.hasRequest
    if(this.requestedGroup){
      const data_user = this.request_users.filter( req => req.user.id == this.user.sub)
      if(data_user.length) this.requestType = data_user[0].status
    }
  }

  public requestGroup(id:string) {
    this.groupService.requestGroup(id).then(() => {
      this.toastService.showSuccess('OK! Solicitação de participação enviada com sucesso!')
    }).catch((e) => {
      this.toastService.showError(e)
    }).finally(() => {
      this.router.navigate(['/home'])
    })
  }

  public acceptRequest(id:string, name:string){
    this.groupService.acceptRequest(id).then(() => {
      this.toastService.showSuccess(`Solicitação de ${name} aceita!`)
    }).catch((e) => {
      this.toastService.showError(e)
    }).finally(() => {
      location.reload()
    })
  }

  public recuseRequest(id:string, name:string){
    this.groupService.recuseRequest(id).then(() => {
      this.toastService.showSuccess(`Solicitação de ${name} recusada!`)
    }).catch((e) => {
      this.toastService.showError(e)
    }).finally(() => {
      location.reload()
    })
  }
}
