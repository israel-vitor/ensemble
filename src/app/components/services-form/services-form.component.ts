import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router";
import { Service } from "../../interfaces/service";
import { Plan } from "../../interfaces/plan";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from "../../interfaces/category";
import {ServiceService} from "../../services/service/service.service";
import {ToastService} from "../../services/toast/toast.service";

@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['./services-form.component.scss']
})
export class ServicesFormComponent implements OnInit {

  @Input() editMode: boolean = false;
  @Input() serviceData: Service = {};

  plan_id = 1
  name: string = ''
  logo: any
  categoryId: number = 0
  plans: Array<Plan> = []
  modalTitle: string = ''
  categories: Category[] = [
    { description: 'Filmes', id: 1 },
    { description: 'Música', id: 2 }
  ]

  //plans (gambiarra)
  plan_name_1: string = ''
  plan_name_2: string = ''
  plan_name_3: string = ''
  plan_name_4: string = ''
  plan_name_5: string = ''
  plan_description_1: string = ''
  plan_description_2: string = ''
  plan_description_3: string = ''
  plan_description_4: string = ''
  plan_description_5: string = ''
  plan_value_1: number = 0
  plan_value_2: number = 0
  plan_value_3: number = 0
  plan_value_4: number = 0
  plan_value_5: number = 0
  plan_total_members_1: number = 0
  plan_total_members_2: number = 0
  plan_total_members_3: number = 0
  plan_total_members_4: number = 0
  plan_total_members_5: number = 0

  constructor(
    public activeModal: NgbActiveModal,
    private serviceService: ServiceService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.modalTitle = this.editMode ? 'Editar Serviço' : 'Novo Serviço'
  }

  saveService(): void{
    const service = {
      name: this.name,
      categoryId: this.categoryId,
      plans: this.plans,
    }
    this.serviceService.create(service).then(() => {
      this.toastService.showSuccess('Serviço criado com sucesso');
      this.router.navigate(['/admin/servicos'])
    }).catch(() => {
      this.toastService.showError('Ocorreu um erro ao realizar seu cadastro');
    })
  }

  addPlan():void{
    if(this.plan_id <= 10){
      document.getElementById(`plan-${++this.plan_id}`)?.classList.remove('display-none')
      const btn = document.getElementById('btn-add-plan')
      if(btn){
        if(this.plan_id >= 10){
          btn.classList.add('display-none')
        } else {
          btn.classList.remove('display-none')
        }
      } 
    }
  }

  removePlan(id: number):void{
    document.getElementById(`plan-${id}`)?.classList.add('display-none')
    this.plan_id--
    const btn = document.getElementById('btn-add-plan')
    if(btn){
      if(this.plan_id >= 10){
        btn.classList.add('display-none')
      } else {
        btn.classList.remove('display-none')
      }
    } 
  }
}
