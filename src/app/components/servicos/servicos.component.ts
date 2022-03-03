import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ServicesFormComponent } from "../services-form/services-form.component";

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  addService() {
    const modalRef = this.modalService.open(ServicesFormComponent, { backdrop: 'static', keyboard: false });
    modalRef.componentInstance.editMode = true;
  }

}
