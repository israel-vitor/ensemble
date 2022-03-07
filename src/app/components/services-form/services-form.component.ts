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
    thumbnail: undefined,
    categoryId: undefined,
    plans: [this.generatePlan()]
  }

  categories: Category[] = []

  isLoading: Boolean =  false

  constructor(
    public activeModal: NgbActiveModal,
    private serviceService: ServiceService,
    private toastService: ToastService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.modalTitle = this.editMode ? 'Editar Serviço' : 'Novo Serviço'
    if (Object.keys(this.serviceData).length) {
      console.log(this.serviceData)
      this.service = {
        ...this.serviceData,
        categoryId: this.serviceData.category?.id
      }
    }
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
    this.isLoading = true
    this.serviceService.create(service).then(async newService => {
      if (this.service.thumbnail) {
        await this.serviceService.addImage(this.service.thumbnail, newService.id)
      }
      this.toastService.showSuccess('Serviço criado com sucesso');
      this.activeModal.close('refresh')
    }).catch(() => {
      this.toastService.showError('Ocorreu um erro ao cadastrar o serviço');
    }).finally(() => {
      this.isLoading = false
    })
  }

  updateService(): void{
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
    this.isLoading = true
    this.serviceService.update(service, this.service.id).then(async () => {
      if (this.service.thumbnail && typeof this.service.thumbnail !== 'string') {
        await this.serviceService.addImage(this.service.thumbnail, this.service.id)
      }
      this.toastService.showSuccess('Serviço atualizado com sucesso');
      this.activeModal.close('refresh')
    }).catch(() => {
      this.toastService.showError('Ocorreu um erro ao atualizar o serviço');
    }).finally(() => {
      this.isLoading = false
    })
  }

  onImageSelect(event: any) {
    this.service.thumbnail = event.target.files[0];
  }

  addPlan(): void {
    if(this.isLoading) {
      return
    }
    this.service.plans?.push(this.generatePlan())
  }

  removePlan(index: number):void{
    if(this.isLoading) {
      return
    }
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

  deleteService() {
    if(this.isLoading) {
      return
    }
    this.isLoading = true
    this.serviceService.delete(this.service.id).then(() => {
      this.toastService.showSuccess('Serviço excluído com sucesso');
      this.activeModal.close('refresh')
    }).catch(() => {
      this.toastService.showError('Ocorreu um erro ao excluir seu serviço');
    }).finally(() => {
      this.isLoading = false
    })
  }

  cancel() {
    if(this.isLoading) {
      return
    }
    this.activeModal.close('cancel')
  }
}
