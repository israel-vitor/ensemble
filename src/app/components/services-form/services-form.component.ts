import { Component, OnInit, Input } from '@angular/core';
import { Service } from "../../interfaces/service";
import { Plan } from "../../interfaces/plan";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from "../../interfaces/category";

@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['./services-form.component.scss']
})
export class ServicesFormComponent implements OnInit {

  @Input() editMode: boolean = false;
  @Input() serviceData: Service = {};

  name: string = ''
  logo: any
  categoryId: number = 0
  plans: Plan[] = []

  modalTitle: string = ''

  categories: Category[] = [
    { description: 'Filmes', id: 1 },
    { description: 'Música', id: 2 }
  ]

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.modalTitle = this.editMode ? 'Editar Serviço' : 'Novo Serviço'
  }

}
