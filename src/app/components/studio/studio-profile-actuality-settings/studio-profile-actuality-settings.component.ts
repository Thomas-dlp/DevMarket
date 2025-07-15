import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { DisplayableElement } from '../../../templates/displayable-element.template';
import { LightElement } from '../../../templates/light-element.template';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { StudioService } from '../../../services/studio-services/studio.service';
import { DisplayableElementReference, DisplayableElementType } from '../../../templates/displayable-element-reference.template';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DevService } from '../../../services/dev-services/dev.service';
import { ActualityManager } from '../../../services/actuality-service/actuality-manager-service/actuality-manager.service';

@Component({
  selector: 'app-studio-profile-actuality-settings',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule,DragDropModule],
  templateUrl: './studio-profile-actuality-settings.component.html',
  styleUrl: './studio-profile-actuality-settings.component.scss'
})
export class StudioProfileActualitySettingsComponent implements OnInit {
actualities$!:Observable<DisplayableElement[]>;
actualitySuggestions$!: Observable<LightElement[]>;

showSuggestions: boolean=false;

actualitySearchBarCtrl!: FormControl;

constructor(private formBuilder:FormBuilder,
   protected studioService:StudioService,
  private devService: DevService,
  private actualityManager: ActualityManager,
   ){}

ngOnInit(){
  this.actualitySearchBarCtrl=this.formBuilder.control("");
  this.actualities$=this.actualityManager.actualities$.pipe(
    map(actualities => actualities.sort((a, b) => a.order - b.order))
  );
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
  const lightDevs= this.devService.getLightDevs();
  this.actualitySuggestions$= lightDevs.pipe(
    map(devs=>devs.filter(dev=>dev.title?.toLowerCase().includes(input.toLowerCase())))
  );
}


/// create a DisplayableElementreference from the lightData
addSuggestionToActualities(suggestion: LightElement) {
  const displayableElementReference: DisplayableElementReference = {
    DisplayableElementId: suggestion.id,
    DisplayableElementType: DisplayableElementType.Dev,
    Order: 1
  };

  // Call the service method with the displayableElementReference
  this.actualityManager.addActualityWithOptimisticPreview(displayableElementReference,"studioID",suggestion);
}


modifyActuality(formerActuality:DisplayableElement, newActuality:DisplayableElement) {
  this.showSuggestions = true; 
  this.actualityManager.modifyActualityById(formerActuality.id,newActuality.id);
  this.showSuggestions = true; 
}


deleteActuality(actuality: DisplayableElement) {
  this.actualityManager.removeActualityById(actuality.id);
}

onMouseEnter() {
  this.showSuggestions = true;
}

onMouseLeave() {
  this.showSuggestions=false;
  setTimeout(() =>{
    if( this.showSuggestions === false){
      this.actualitySearchBarCtrl.reset();
    }
  } , 100);
  
}
  
}
