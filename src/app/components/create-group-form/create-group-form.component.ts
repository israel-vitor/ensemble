import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Service} from "../../interfaces/service";

@Component({
  selector: 'app-create-group-form',
  templateUrl: './create-group-form.component.html',
  styleUrls: ['./create-group-form.component.scss']
})
export class CreateGroupFormComponent implements OnInit {

  @Input() serviceData: Service = {};

  public planId: number | undefined;
  public serviceId: number | undefined;

  constructor(public activeModal: NgbActiveModal) {
    this.serviceId = this.serviceData.id
  }

  ngOnInit(): void {
  }

}
