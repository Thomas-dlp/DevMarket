import { Component, OnInit } from '@angular/core';
import { StudioPageService } from '../../../services/studio-page-service';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { StudioPage } from '../../../templates/studio-page.template';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-studio-page',
  imports: [NgStyle, AsyncPipe,NgIf],
  templateUrl: './studio-page.component.html',
  styleUrl: './studio-page.component.scss'
})
export class StudioPageComponent implements OnInit{

  studioPageId!:string;
  studioPage$!:Observable<StudioPage>;

  constructor(private studioPageService:StudioPageService, private activeRoute:ActivatedRoute){}
  
  ngOnInit(): void {
    this.studioPageId=this.activeRoute.snapshot.params['id'];
    console.log(this.studioPageId);
    this.studioPage$=this.studioPageService.getStudioPageById(this.studioPageId);
  }
  
  
}

