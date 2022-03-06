import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicos',
  templateUrl: './criar-grupo.component.html',
  styleUrls: ['./criar-grupo.component.scss']
})
export class CriarGrupoComponent implements OnInit {

  // public groups = [
  //   {id: 1, service: 'Netflix', auth: 'member', total_vacancies: 2, price: '15'},
  //   {id: 2, service: 'Amazon Prime', auth: 'member', total_vacancies: 0, price: '7'},
  //   {id: 3, service: 'Disney+', auth: 'admin', total_vacancies: 3, price: '20'}
  // ];

  public services = [
    {id: 1, service: 'Netflix', image: '../../../assets/image/Netflix_logo.png'},
    {id: 1, service: 'Amazon Prime', image: '../../../assets/image/primevideo_logo.jpg'},
    {id: 1, service: 'Disney+', image: '../../../assets/image/Disney+_logo.png'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
