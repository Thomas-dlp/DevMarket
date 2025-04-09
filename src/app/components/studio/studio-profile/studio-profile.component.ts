import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive, RouterModule } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { StudioService } from '../../../services/studio-services/studio.service';
import { StudioProfile } from '../../../templates/studio-profile.template';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DisplayableElement } from '../../../templates/displayable-element.template';
import { environment } from '../../../../environments/environments';
import { DevService } from '../../../services/dev-services/dev.service';
import { LightElement } from '../../../templates/light-element.template';
import { DisplayableElementReference, DisplayableElementType } from '../../../templates/displayable-element-reference.template';
import { DragDropModule } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-studio-profile',
  imports: [CommonModule, ReactiveFormsModule,RouterModule,DragDropModule],
  templateUrl: './studio-profile.component.html',
  styleUrl: './studio-profile.component.scss'
})
export class StudioProfileComponent implements OnInit{

  profile$!:Observable<StudioProfile>
  actualities$!:Observable<DisplayableElement[]>;
  actualitySuggestions$!: Observable<LightElement[]>;

  showSuggestions: boolean=false;

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
    private router: Router
  ){}

  ngOnInit(): void {
    this.studioService.studioId=this.activeRoute.snapshot.params['id'];
    this.profile$=this.studioService.getStudioProfile();
    this.initFormControls();
    this.initMainForm();
    this.profile$.subscribe(profile => {
      console.log('Received studioProfile:', profile);
      if (profile) {
        this.profileForm.patchValue(profile);  
      }
    });
    this.actualities$=this.studioService.actualities$.pipe(
      map(actualities => actualities.sort((a, b) => a.order - b.order))
    );
    this.studioService.getAllActualities();

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

  saveForm() { 
    if(this.profileForm.invalid){
      console.log("invalid form");
      return;
    }
    this.studioService.updateForm(this.profileForm.getRawValue()).subscribe(
      result=>console.log('updated form:',result)
    );
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

  onActualitySearchBarTextChange() {
    const actualitySearchBartext= this.actualitySearchBarCtrl.value;
    if( actualitySearchBartext && actualitySearchBartext.length>2){
      this.fetchActualitySuggestions(actualitySearchBartext);
    }else{
      this.actualitySuggestions$=of([]);
    }
    this.actualitySuggestions$.subscribe(result=>console.log("actualitySuggestions:",result));
  }

  fetchActualitySuggestions(input:string){
    const lightDevs= this.studioService.getLightDevs();
    this.actualitySuggestions$= lightDevs.pipe(
      map(devs=>devs.filter(dev=>dev.title?.toLowerCase().includes(input.toLowerCase())))
    );
  }

  addSuggestionToActualities(suggestion: LightElement) {
    const displayableElementReference: DisplayableElementReference = {
      DisplayableElementId: suggestion.id,
      DisplayableElementType: DisplayableElementType.Dev,
      Order: 1
    };
  
    // Call the service method with the displayableElementReference
    this.studioService.addActuality(displayableElementReference);
  }
  

  modifyActuality(formerActuality:DisplayableElement, newActuality:DisplayableElement) {
    this.showSuggestions = true; 
    this.studioService.modifyActualityById(formerActuality.id,newActuality.id);
    this.showSuggestions = true; 
  }

  deleteActuality(actuality: DisplayableElement) {
    this.studioService.deleteActualityById(actuality.id);
  }

  onMouseEnter() {
    this.showSuggestions = true;
  }

  onFocus(){
    this.showSuggestions = true;
  }

  onMouseLeave() {
    // Optional: delay hiding to allow click
    setTimeout(() => this.showSuggestions = false, 0);
    this.actualitySearchBarCtrl.reset();
    this.actualitySuggestions$=of( [])
  }
 
  

}
