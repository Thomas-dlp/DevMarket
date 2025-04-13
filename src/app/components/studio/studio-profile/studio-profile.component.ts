import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { StudioService } from '../../../services/studio-services/studio.service';
import { StudioProfile } from '../../../templates/studio-profile.template';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DevService } from '../../../services/dev-services/dev.service';
import { StudioProfileSettingsComponent } from "../studio-profile-settings/studio-profile-settings.component";
import { StudioProfileActualitySettingsComponent } from "../studio-profile-actuality-settings/studio-profile-actuality-settings.component";
import { StudioProfileDevSettingsComponent } from "../studio-profile-dev-settings/studio-profile-dev-settings.component";


@Component({
  selector: 'app-studio-profile',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, StudioProfileSettingsComponent, StudioProfileActualitySettingsComponent, StudioProfileDevSettingsComponent],
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
    protected studioService: StudioService,
  ){}

  ngOnInit(): void {
    this.studioService.studioId=this.activeRoute.snapshot.params['id'];
    console.log("studioId:", this.studioService.studioId);
    this.profile$=this.studioService.getStudioProfile();
    this.profile$.subscribe(profile=>console.log("profile name:", profile.name));
  }

  selectTab(tabId:number){
    this.selectedTab=tabId;
  }

}
