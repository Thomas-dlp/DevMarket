import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dev } from '../../../templates/dev.template';
import { DevServices } from '../../../services/dev-services';

@Component({
  selector: 'app-dev-list',
  imports: [],
  templateUrl: './dev-list.component.html',
  styleUrl: './dev-list.component.scss'
})
export class DevListComponent implements OnInit {
  

  devs$!:Observable<Dev[]>;

  constructor(private devService: DevServices){}
  ngOnInit(): void {
    this.devs$=this.devService.getDevsbyStudio("");
  }

}
