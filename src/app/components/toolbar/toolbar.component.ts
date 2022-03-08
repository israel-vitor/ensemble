import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../services/session/session.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public sessionService: SessionService) { }

  ngOnInit(): void {
  }

  public switchShowMenu(): void{
    const menu = document.getElementById('navbarSupportedContent')
    if(menu){
      menu.classList.contains('show') ? menu.classList.remove('show') : menu.classList.add('show')
    }
  }

}
