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
      id: 0
    },
    users: [{}]
  }
  thumbnail: string = ''
  user = {
    sub: -1,
    email: ''
  }

  public users = [
    {id: 1, name: 'Gabriel', accept: true},
    {id: 2, name: 'Pedro', accept: false},
    {id: 3, name: 'Julia', accept: false}
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
    this.verifyOwner()
    if(this.isOwner){
      this.verifyRequests()
    }
  }

  public loadGroup(): void{
    this.groupService.getGroupById(this.group_id).then((group) => {
      this.group = group
      console.log(group)
      this.thumbnail = this.commonService.getImageUrl(group.service.thumbnail, 'services')
    }).catch(() => {
      this.toastService.showError('Erro ao carregar o grupo')
    })
  }

  public verifyOwner(){
    this.user = this.sessionService.getUser()
    if(this.user.sub == this.group.owner.id){
      this.isOwner = true
    } else {
      this.isOwner = false
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

  public verifyRequests(){
    this.groupService.getRequestGroup(this.group_id).then((requests) => {
      console.log(requests)
    }).catch((e) => {
      this.toastService.showError(e)
    })
  }
}
