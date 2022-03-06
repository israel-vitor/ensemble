import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-servicos',
  templateUrl: './meus-grupos.component.html',
  styleUrls: ['./meus-grupos.component.scss']
})
export class MeusGruposComponent implements OnInit {

  public owner_groups = [
    {id: 1, service: 'Amazon Prime', image: '../../../assets/image/primevideo_logo.jpg', group_name:'Grupo Teste de Amazon Prime', price: 14, total_vacancies: 0},
  ];

  public member_groups = [
    {id: 1, service: 'Netflix', image: '../../../assets/image/Netflix_logo.png', group_name:'Grupo Teste de Netflix', price: 14, total_vacancies: 2},
    {id: 1, service: 'Disney+', image: '../../../assets/image/Disney+_logo.png', group_name:'Grupo Teste de Disney+', price: 14, total_vacancies: 3},
  ];

  public isAdmin:boolean = false; 

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public view_div(div: string): void {
    const btn_membro = document.getElementById('btn_membro')
    const btn_admin = document.getElementById('btn_admin')
    if(div == 'membro'){
      this.isAdmin = false
      btn_membro?.classList.add('bg-info-mod')
      btn_membro?.classList.remove('no-bg')
      btn_admin?.classList.remove('bg-info-mod')
      btn_admin?.classList.add('no-bg')
    } else if (div == 'admin'){
      this.isAdmin = true
      btn_membro?.classList.remove('bg-info-mod')
      btn_membro?.classList.add('no-bg')
      btn_admin?.classList.remove('no-bg')
      btn_admin?.classList.add('bg-info-mod')
    }
  }

  showDetails(groupId: number) {
    this.router.navigate([`/grupo/${groupId}`])
  }

}
