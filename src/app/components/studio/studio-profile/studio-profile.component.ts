import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive, RouterModule } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { StudioService } from '../../../services/studio-services/studio.service';
import { StudioProfile } from '../../../templates/studio-profile.template';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DisplayableElement } from '../../../templates/displayable-element.template';
import { environment } from '../../../../environments/environments';
import { DevService } from '../../../services/dev-services/dev.service';
import { StudioProfileSettingsComponent } from "../studio-profile-settings/studio-profile-settings.component";
import { StudioProfileDevSettingsComponent } from "../studio-profile-dev-settings/studio-profile-dev-settings.component";
import { StudioProfileActualitySettingsComponent } from "../studio-profile-actuality-settings/studio-profile-actuality-settings.component";


@Component({
  selector: 'app-studio-profile',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, StudioProfileSettingsComponent, StudioProfileSettingsComponent, StudioProfileActualitySettingsComponent, StudioProfileDevSettingsComponent],
  templateUrl: './studio-profile.component.html',
  styleUrl: './studio-profile.component.scss'
})
export class StudioProfileComponent implements OnInit{


  profile$!:Observable<StudioProfile>
  

  tabs:any= [
    {
      id:1,
      label: "General settings",
    },
    {
      id:2,
      label:"Actuality settings"
    },
    {
      id:3,
      label:"Dev settings"
    }
  ];
  selectedTab:number=1;

  constructor(
    private activeRoute: ActivatedRoute,
    private studioService: StudioService
  ){}

  ngOnInit(): void {
    this.studioService.studioId=this.activeRoute.parent?.snapshot.params['id'];
    this.profile$=this.studioService.getStudioProfile();
  }



  selectTab(tabId:number){
    this.selectedTab=tabId;
  }
 

}
