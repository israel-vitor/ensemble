import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ServicesFormComponent } from "../services-form/services-form.component";
import {Service} from "../../interfaces/service";
import {ServiceService} from "../../services/service/service.service";
import {CommonService} from "../../services/common/common.service";
import {ToastService} from "../../services/toast/toast.service";

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private serviceService: ServiceService,
    private toastService: ToastService,
    private commonService: CommonService,
  ) { }

  public services: Service[] = []

  ngOnInit(): void {
    this.loadServices()
  }

  addService() {
    const modalRef = this.modalService.open(ServicesFormComponent, { backdrop: 'static', keyboard: false });
    // modalRef.componentInstance.editMode = true;
    modalRef.result.then(result => {
      if(result === 'refresh') {
        this.loadServices()
      }
    })
  }

  loadServices() {
    this.serviceService.getServices().then(services => {
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

}
