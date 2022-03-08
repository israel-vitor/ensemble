import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Service} from "../../interfaces/service";
import {Plan} from "../../interfaces/plan";
import {GroupService} from "../../services/group/group.service";
import {Group} from "../../interfaces/group";
import {ToastService} from "../../services/toast/toast.service";
import {SessionService} from "../../services/session/session.service";

@Component({
  selector: 'app-create-group-form',
  templateUrl: './create-group-form.component.html',
  styleUrls: ['./create-group-form.component.scss']
})
export class CreateGroupFormComponent implements OnInit {

  @Input() serviceData: Service = {};

  public planId?: number;
  public serviceId?: number;
  public user = {sub:'', email:'', name:''}

  public groupName?: string;
  public plans: Plan[] = [];

  public price?: string;
  public usersNumber?: number;
  public valuePerUser?: string;

  constructor(
    public activeModal: NgbActiveModal,
    private groupService: GroupService,
    private toastService: ToastService,
    private sessionService: SessionService,
  ) {}

  ngOnInit(): void {
    this.serviceId = this.serviceData.id
    this.plans = this.serviceData.plans || []
    this.user = this.sessionService.getUser()
    const [userFirstName = ''] = this.user.name.split(' ')
    this.groupName = this.serviceData.name + ' do(a) ' + userFirstName
  }

  updatePlan(newValue: any) {
    const { price = '', usersNumber = 0 } = this.plans.find(plan => plan.id === Number(newValue)) || {}
    this.price = `R$ ${price}`
    this.usersNumber = usersNumber
    const valuePerMember = Number(price) / usersNumber
    this.valuePerUser = `R$ ${valuePerMember.toFixed(2)}`
  }

  public createGroup(): void {
    const newGroup: Group = {
      name: this.groupName,
      planId: this.planId,
      serviceId: this.serviceId
    }
    this.groupService.createGroup(newGroup).then(()=> {
      this.toastService.showSuccess('Grupo criado com sucesso')
      this.activeModal.dismiss()
    }).catch(() => {
      this.toastService.showError('Ocorreu um erro ao criar seu grupo')
    })
  }

}
