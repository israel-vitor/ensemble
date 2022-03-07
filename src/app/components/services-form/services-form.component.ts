import { Component, OnInit, Input } from '@angular/core';
import { Service } from "../../interfaces/service";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from "../../interfaces/category";
import {ServiceService} from "../../services/service/service.service";
import {ToastService} from "../../services/toast/toast.service";
import {CategoryService} from "../../services/category/category.service";
import {Plan} from "../../interfaces/plan";

@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['./services-form.component.scss']
})
export class ServicesFormComponent implements OnInit {

  @Input() editMode: boolean = false;
  @Input() serviceData: Service = {};

  modalTitle: string = ''

  service: Service = {
    name: undefined,
    logo: undefined,
    categoryId: undefined,
    plans: [this.generatePlan()]
  }

  categories: Category[] = []

  constructor(
    public activeModal: NgbActiveModal,
    private serviceService: ServiceService,
    private toastService: ToastService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.modalTitle = this.editMode ? 'Editar Serviço' : 'Novo Serviço'
    this.loadCategories()
  }

  loadCategories() {
    this.categoryService.getAllCategories().then(categories => {
      this.categories = categories
    })
  }

  saveService(): void{
    const service = {
      name: this.service.name,
      categoryId: Number(this.service.categoryId),
      plans: this.service.plans?.map(plan => {
        return {
          ...plan,
          price: Number(plan.price) || 0
        }
      }),
    }
    this.serviceService.create(service).then(async (response) => {
      // TODO: remove this when felipe fix the new service response
      const newService = response.find((service: any) => service.name === this.service.name)
      if (this.service.logo) {
        await this.serviceService.addImage(this.service.logo, newService.id)
        this.toastService.showSuccess('Serviço criado com sucesso');
      }
      this.activeModal.close('refresh')
    }).catch(() => {
      this.toastService.showError('Ocorreu um erro ao realizar seu cadastro');
    })
  }

  onImageSelect(event: any) {
    this.service.logo = event.target.files[0];
  }

  addPlan(): void {
    this.service.plans?.push(this.generatePlan())
  }

  removePlan(index: number):void{
    this.service.plans?.splice(index, 1)
  }

  generatePlan(): Plan {
    return {
      name: undefined,
      usersNumber: undefined,
      price: undefined,
      description: undefined
    }
  }
}
