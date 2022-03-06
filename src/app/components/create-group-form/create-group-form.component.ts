import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Service} from "../../interfaces/service";
import {Plan} from "../../interfaces/plan";

@Component({
  selector: 'app-create-group-form',
  templateUrl: './create-group-form.component.html',
  styleUrls: ['./create-group-form.component.scss']
})
export class CreateGroupFormComponent implements OnInit {

  @Input() serviceData: Service = {};

  public planId?: number;
  public serviceId?: number;

  public groupName?: string;
  public plans: Plan[] = [];

  public price?: string;
  public usersNumber?: number;
  public valuePerUser?: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.serviceId = this.serviceData.id
    this.plans = this.serviceData.plans || []
    // TODO: user the stored user data here to show the user name
    this.groupName = this.serviceData.name + ' do(a) ' + 'Israel'
  }

  updatePlan(newValue: any) {
    const { price = '', usersNumber = 0 } = this.plans.find(plan => plan.id === Number(newValue)) || {}
    this.price = `R$ ${price}`
    this.usersNumber = usersNumber
    const valuePerMember = Number(price) / usersNumber
    this.valuePerUser = `R$ ${valuePerMember.toFixed(2)}`
  }

}
