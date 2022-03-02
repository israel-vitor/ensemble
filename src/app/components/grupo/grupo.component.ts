import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicos',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit {

  public isOwner: boolean = true;

  public users = [
    {id: 1, name: 'Gabriel', accept: true},
    {id: 2, name: 'Pedro', accept: false},
    {id: 3, name: 'Julia', accept: false}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
