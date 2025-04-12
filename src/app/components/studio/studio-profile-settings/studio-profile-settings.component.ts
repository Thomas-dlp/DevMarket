import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StudioService } from '../../../services/studio-services/studio.service';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { StudioProfile } from '../../../templates/studio-profile.template';

@Component({
  selector: 'app-studio-profile-settings',
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './studio-profile-settings.component.html',
  styleUrl: './studio-profile-settings.component.scss'
})
export class StudioProfileSettingsComponent implements OnInit, OnDestroy{
  @Input()
  set studioProfile$(profile$: Observable<StudioProfile>) {
    if (profile$) {
      profile$
        .pipe(takeUntil(this.destroy$))
        .subscribe(profile => {
          this.profileForm.patchValue(profile);
        });
    }
  }

  private destroy$ = new Subject<void>();
  
  profileForm!:FormGroup;

  nameCtrl!:FormControl;
  logoUrlCtrl!: FormControl;
  backgroudPictureUrlCtrl!: FormControl;
  abstractCtrl!: FormControl;
  bioCtrl!: FormControl;

  constructor(protected studioService: StudioService, private formBuilder:FormBuilder){}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.studioProfile$ .pipe(filter(Boolean)).subscribe(profile => {
          console.log('Received studioProfile:', profile);
          if (profile) {
            this.profileForm.patchValue(profile);  
          }
        });
  }



  private initMainForm():void{
      this.profileForm= this.formBuilder.group({
        name: this.nameCtrl,
        logoUrl: this.logoUrlCtrl,
        backgroundPictureUrl: this.backgroudPictureUrlCtrl,
        abstract: this.abstractCtrl,
        bio: this.bioCtrl
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
  if(this.profileForm.invalid){
    console.log("invalid form");
    return;
  }
  this.studioService.updateForm(this.profileForm.getRawValue()).subscribe(
    result=>console.log('updated form:',result)
  );
}
}
