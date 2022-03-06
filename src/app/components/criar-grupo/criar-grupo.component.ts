import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../../services/service/service.service";
import {Service} from "../../interfaces/service";
import {ToastService} from "../../services/toast/toast.service";
import {CommonService} from "../../services/common/common.service";
import {ServicesFormComponent} from "../services-form/services-form.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateGroupFormComponent} from "../create-group-form/create-group-form.component";

@Component({
  selector: 'app-servicos',
  templateUrl: './criar-grupo.component.html',
  styleUrls: ['./criar-grupo.component.scss']
})
export class CriarGrupoComponent implements OnInit {

  public services: Service[] = []

  constructor(
    private serviceService: ServiceService,
    private toastService: ToastService,
    private commonService: CommonService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories() {
    this.serviceService.getServices().then(services => {
      console.log(services)
      this.services = services.map((service: Service) => {
        return {
          ...service,
          thumbnail: this.commonService.getImageUrl(service.thumbnail, 'services')
        }
      })
    }).catch(() => {
      this.toastService.showError('Erro ao carregar os grupos');
    })
  }

  startCreatingGroup(service: Service) {
    const modalRef = this.modalService.open(CreateGroupFormComponent, { backdrop: 'static', keyboard: false });
    modalRef.componentInstance.serviceData = service;
  }

}
