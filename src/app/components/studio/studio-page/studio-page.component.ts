import { Component, OnInit } from '@angular/core';
import { StudioPageService } from '../../../services/studio-page-services/studio-page.service';
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

  constructor(private studioPageService:StudioPageService,
              private activeRoute:ActivatedRoute,
              private router: Router
            ){}
  
  ngOnInit(): void {
    this.studioPageId=this.activeRoute.snapshot.params['id'];
    this.studioPage$=this.studioPageService.getStudioPageById(this.studioPageId);
  }

  navigateToOverviewByStudioId(id:string) {
    this.router.navigateByUrl(`${environment.apiUrl}/${id}/studio-overview`);
  }
  
  navigateToDevsbyStudioId(id:string) {
    this.router.navigate(['/devs'], {queryParams: {studioId: id}});
  }  

  navigateToItemOrigin(item: DisplayableElement) {
    this.router.navigateByUrl(item.sourceUrl); //todo: is url as a property the best way to navigate?
  }

}

