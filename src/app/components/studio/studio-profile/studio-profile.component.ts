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
import { ActualityManager } from '../../../services/actuality-service/actuality-manager-service/actuality-manager.service';


@Component({
  selector: 'app-studio-profile',
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './studio-profile.component.html',
  styleUrl: './studio-profile.component.scss'
})
export class StudioProfileComponent implements OnInit{


  profile$!:Observable<StudioProfile>
  actualities$!:Observable<DisplayableElement[]>;

  profileForm!:FormGroup;
  nameCtrl!:FormControl;
  logoUrlCtrl!: FormControl;
  backgroudPictureUrlCtrl!: FormControl;
  abstractCtrl!: FormControl;
  bioCtrl!: FormControl;
  newDevForm!:FormGroup;
  devNameCtrl!:FormControl;
  devLogoUrlCtrl!: FormControl;
  devDescriptionCtrl!: FormControl;
  actualitySearchBarCtrl!: FormControl;



  constructor(
    private activeRoute: ActivatedRoute,
    protected studioService: StudioService,
    private devService: DevService,
    private formBuilder: FormBuilder,
    private router: Router,
    private actualityManager: ActualityManager
  ){}

  ngOnInit(): void {
    this.studioService.studioId=this.activeRoute.parent?.snapshot.params['id'];
    this.profile$=this.studioService.getStudioProfile();
    this.initFormControls();
    this.initMainForm();
    this.profile$.subscribe(profile => {
      console.log('Received studioProfile:', profile);
      if (profile) {
        this.profileForm.patchValue(profile);  
      }
    });
    this.actualities$=this.actualityManager.actualities$.pipe(
      map(actualities => actualities.sort((a, b) => a.order - b.order))
    );
    this.initDevFormControls();
    this.initDevFormGroup();

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
    this.actualitySearchBarCtrl=this.formBuilder.control("");
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

  saveForm() {
    this.studioService.updateStudioProfileForm(this.profileForm);
  }

  fetcActualitySuggestions(input: string){
    const allSugggestions= ["actuality1","actuality"]
  }
  // modifyActuality(formerActuality:DisplayableElement, newActuality:DisplayableElement) {
  //   this.actualityManager.modifyActualityById(formerActuality.id,newActuality.id);
  // }

  
 

}
