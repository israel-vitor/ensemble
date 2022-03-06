import { Component, OnInit } from '@angular/core';

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



  constructor() { }

  ngOnInit(): void {
  }

}
