import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { StudioProfileService } from '../../../services/studio-profile-services/studio-profile.service';
import { StudioProfile } from '../../../templates/studio-profile.template';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-studio-profile',
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './studio-profile.component.html',
  styleUrl: './studio-profile.component.scss'
})
export class StudioProfileComponent implements OnInit{

  studioProfileId!:string;
  studioProfile$!:Observable<StudioProfile>

  studioProfileForm!:FormGroup;
  nameCtrl!:FormControl;
  logoUrlCtrl!: FormControl;
  backgroudPictureUrlCtrl!: FormControl;
  abstractCtrl!: FormControl;
  bioCtrl!: FormControl


  constructor(private activeRoute: ActivatedRoute, private studioProfileService: StudioProfileService, private formBuilder: FormBuilder){}
  ngOnInit(): void {
    this.studioProfileId=this.activeRoute.snapshot.params['id'];
    this.studioProfile$=this.studioProfileService.getStudioProfileById(this.studioProfileId);
    this.initFormControls();
    this.initMainForm();
    this.studioProfile$.subscribe(studioProfile => {
      console.log('Received studioProfile:', studioProfile);
      if (studioProfile) {
        this.studioProfileForm.patchValue(studioProfile);  
      }
    });
  }

  private initMainForm():void{
    this.studioProfileForm= this.formBuilder.group({
      name: this.nameCtrl,
      logoUrl:this.logoUrlCtrl,
      backgroundPictureUrl:this.backgroudPictureUrlCtrl,
      abstract:this.abstractCtrl,
      bio:this.bioCtrl
    });
  }

  private initFormControls(){
    this.nameCtrl=this.formBuilder.control("",Validators.required);
    this.logoUrlCtrl=this.formBuilder.control("");
    this.backgroudPictureUrlCtrl=this.formBuilder.control("");
    this.abstractCtrl=this.formBuilder.control("");
    this.bioCtrl=this.formBuilder.control("");
  }

  saveForm() { 
    if(this.studioProfileForm.invalid){
      console.log("invalid form");
      return;
    }
    this.studioProfileService.updateForm(this.studioProfileId,this.studioProfileForm.getRawValue()).subscribe(
      result=>console.log('updated form:',result)
    );
    }

}
