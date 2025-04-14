import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudioService } from '../../../services/studio-services/studio.service';
import { DevService } from '../../../services/dev-services/dev.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studio-profile-dev-settings',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './studio-profile-dev-settings.component.html',
  styleUrl: './studio-profile-dev-settings.component.scss'
})
export class StudioProfileDevSettingsComponent implements OnInit{
  newDevForm!:FormGroup;
  devNameCtrl!:FormControl;
  devLogoUrlCtrl!: FormControl;
  devDescriptionCtrl!: FormControl;
  
  constructor(private formBuilder:FormBuilder, private studioService: StudioService, private devService:DevService, private router: Router){}
  ngOnInit(): void {
    this.initDevFormControls();
    this.initDevFormGroup();
  }

  initDevFormGroup(){
    this.newDevForm=this.formBuilder.group({
      name: this.devNameCtrl,
      logoUrl: this.devLogoUrlCtrl,
      description: this.devDescriptionCtrl
    })
  }
  private initDevFormControls(){
    this.devNameCtrl=this.formBuilder.control("",Validators.required);
    this.devLogoUrlCtrl=this.formBuilder.control("");
    this.devDescriptionCtrl=this.formBuilder.control("");
  }

  createNewDev() {
    this.newDevForm.updateValueAndValidity();
    if (this.newDevForm.valid) {
      const payload={
        ...this.newDevForm.getRawValue(),
        studioId: this.studioService.studioId
      };
      this.devService.createNewDev(payload).subscribe({
        next: response => {
            if (response.id){
              console.log(`${environment.apiUrl}/dev/${response.id}`);
              this.router.navigateByUrl(`dev/${response.id}`).then(success => {
                if (success) {
                  this.newDevForm.reset(); 
                }
              });
            } 
        },
        error: err => {
          console.error('Failed to create new dev:', err);
          // Optionally show error to user (e.g. toast, dialog)
        },
        complete: () => {
          console.log('Dev creation request completed.');
        }
      });
    }
  }
}
