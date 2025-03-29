import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dev } from '../../../templates/dev.template';
import { DevService } from '../../../services/dev-services/dev.service';

@Component({
  selector: 'app-dev-list',
  imports: [],
  templateUrl: './dev-list.component.html',
  styleUrl: './dev-list.component.scss'
})
export class DevListComponent implements OnInit {
  

  devs$!:Observable<Dev[]>;

  constructor(private devService: DevService){}
  ngOnInit(): void {
    this.devs$=this.devService.getDevsbyStudio("");
  }

}
