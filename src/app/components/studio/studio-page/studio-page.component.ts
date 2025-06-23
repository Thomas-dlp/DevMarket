import { Component, OnInit } from '@angular/core';
import { StudioService } from '../../../services/studio-services/studio.service';
import { ActivatedRoute, Route, Router, RouterLinkActive } from '@angular/router';
import { StudioPage } from '../../../templates/studio-page.template';
import { map, Observable, tap } from 'rxjs';
import { AsyncPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { Studio } from '../../../templates/studio.template';
import { DisplayableElement } from '../../../templates/displayable-element.template';
import { HttpClient } from '@angular/common/http';
import { Dev } from '../../../templates/dev.template';
import { environment } from '../../../../environments/environments';
import { ActualityManager } from '../../../services/actuality-service/actuality-manager-service/actuality-manager.service';
import { DevService } from '../../../services/dev-services/dev.service';

@Component({
  selector: 'app-studio-page',
  imports: [NgStyle, AsyncPipe,NgIf,NgFor],
  providers:[DevService],
  templateUrl: './studio-page.component.html',
  styleUrl: './studio-page.component.scss'
})
export class StudioPageComponent implements OnInit{
  studioPageId!:string;
  studioPage$!:Observable<StudioPage>;
  studioActualities$!:Observable<DisplayableElement[]>;
  studioPresentation$!:Observable<string>;
  studioDevs$!:Observable<Dev[]>; //todo: encapsulate in a displayable Dev class to add display properties?

  constructor(private studioService:StudioService,
              private devService: DevService,
              private activeRoute:ActivatedRoute,
              private router: Router,
              private actualityManager: ActualityManager
            ){}
  
  ngOnInit(): void {
    this.studioService.studioId=this.activeRoute.parent?.snapshot.params['id']; //todo: manage the id beetween the two components calling the service
    this.studioPage$=this.studioService.getStudioPage();
    console.log(`manager id:${this.actualityManager.parentId}`);
    this.devService.setStudioId(this.studioService.studioId);
    this.studioDevs$= this.devService.devs$;
    this.devService.loadDevs();
    this.studioActualities$=this.actualityManager.actualities$.pipe(
      map(actualities=>actualities.sort((a,b)=>a.order-b.order))
    )
  }

  navigateToOverview() {
    this.router.navigateByUrl(`${environment.apiUrl}/studio/${this.studioPageId}/overview`);
  }
  
  navigateToDevs() {
    this.router.navigate(['/devs'], {queryParams: {studioId: this.studioPageId}});
  }  

  navigateToItemOrigin(item: DisplayableElement) {
    // this.router.navigateByUrl(`${environment.apiUrl}/studio/${this.studioService.studioId}/type/${item.getType()}/id=${item.id}`); 
  }

}

