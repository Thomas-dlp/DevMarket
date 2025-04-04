import { Component, OnInit } from '@angular/core';
import { StudioService } from '../../../services/studio-services/studio.service';
import { ActivatedRoute, Route, Router, RouterLinkActive } from '@angular/router';
import { StudioPage } from '../../../templates/studio-page.template';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { Studio } from '../../../templates/studio.template';
import { DisplayableElement } from '../../../templates/displayable-element.template';
import { HttpClient } from '@angular/common/http';
import { Dev } from '../../../templates/dev.template';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-studio-page',
  imports: [NgStyle, AsyncPipe,NgIf,NgFor],
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
              private activeRoute:ActivatedRoute,
              private router: Router
            ){}
  
  ngOnInit(): void {
    this.studioService.studioId=this.activeRoute.snapshot.params['id']; //todo: manage the id beetween the two components calling the service
    this.studioPage$=this.studioService.getStudioPage();
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

