import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dev } from '../../../templates/dev.template';
import { DevService } from '../../../services/dev-services/dev.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dev-list',
  imports: [],
  templateUrl: './dev-list.component.html',
  styleUrl: './dev-list.component.scss'
})
export class DevListComponent implements OnInit {
  

  devs$!:Observable<Dev[]>;

  constructor(private devService: DevService,
              private activeRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params=>{
      const studioId =params['studioId'];
      if(studioId){
        this.devService.setStudioId(studioId);
      }
    });
  }

  changeStudio(studioId:string){
    this.devService.setStudioId(studioId);
  }

}
