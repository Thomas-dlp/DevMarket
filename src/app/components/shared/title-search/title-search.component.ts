import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, Observable, switchMap } from 'rxjs';
import { LightElement } from '../../../templates/light-element.template';

@Component({
  selector: 'app-title-search',
  imports: [ReactiveFormsModule,NgFor,NgIf, AsyncPipe],
  templateUrl: './title-search.component.html',
  styleUrl: './title-search.component.scss'
})
export class TitleSearchComponent implements OnInit {
  @Input() searchCtrl!: FormControl;
  @Input() suggestions$!: Observable<string[]>;
  filteredSuggestions$!:Observable<string[]>;
  ngOnInit(): void {
  this.filteredSuggestions$=this.setTitleSuggestions();
    
  }

  setTitleSuggestions():Observable<string[]>{
    return this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
      switchMap((value:string)=>{
        return this.suggestions$.pipe(
          map(suggestions=>suggestions.filter(suggestion=>suggestion.toLowerCase().includes(value.toLocaleLowerCase()))),
        );
      })
    )
  }

  autoCompleteSuggestion(suggestion:string){
    this.searchCtrl.setValue(suggestion);
  }

}
