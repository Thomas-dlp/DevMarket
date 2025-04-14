import { Component, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, of, ReplaySubject, startWith, switchMap, take } from 'rxjs';
import { LightElement } from '../../../templates/light-element.template';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterSelection } from '../../../templates/filter-selection.template';

@Component({
  selector: 'app-filter-selection',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './filter-selection.component.html',
  styleUrl: './filter-selection.component.scss'
})
export class FilterSelectionComponent implements OnInit{
  @Input() filterSelection$!:Observable<FilterSelection[]>;

  filterSuggestions$!: Observable<LightElement[]>;
  selectedFilterType$!: Observable<FilterSelection|undefined>;

  selectedFilterTypeName$= new BehaviorSubject<string>("");
  private _selectedFilter$= new BehaviorSubject<{type: string, output: string}>({type:"",output:""})

  showFilterSuggestions:boolean=false;
  filterCtrl= new FormControl("",{nonNullable:true});

  @Output() selectedFilter$=this._selectedFilter$.asObservable();

  constructor(){}

  ngOnInit(): void {
    this.selectedFilterType$=combineLatest([this.selectedFilterTypeName$,this.filterSelection$]).pipe(
     map(([selectedName,filters])=>
        filters.find(filter=>filter.name.toLocaleLowerCase()===selectedName.toLocaleLowerCase())
      )
    );

    this.filterSuggestions$=combineLatest([this.selectedFilterType$,this.filterCtrl.valueChanges.pipe(startWith(""))]).pipe(
      debounceTime(300),
      switchMap(([filter,input])=>{
        return of(filter?.suggestions.filter(suggestion=>suggestion.title.toLocaleLowerCase().includes(input.toLocaleLowerCase()))??[]);
      }
      )
    );
    

    this.filterSelection$.pipe(take(1)).subscribe((selections => {
      const first = selections?.[0]?.name;
      if (first) {
        this.selectedFilterTypeName$.next(first);
      }
    }));
    
  }

  setFilterlinkedToForm(filter:Event){
    const selectedFilter=(filter.target as HTMLSelectElement).value;
    this.selectedFilterTypeName$.next(selectedFilter);
  }

  addSuggestionToFilters(suggestion:LightElement){
    this._selectedFilter$.next({type:this.selectedFilterTypeName$.getValue(),output:suggestion.title})
  }

  onMouseEnterFilterForm() {
    this.showFilterSuggestions = true;
  }

  onMouseLeaveFilterForm() {
    this.showFilterSuggestions=false;
    setTimeout(() =>{
      if(this.showFilterSuggestions===false){
        this.filterCtrl.reset();
      }
    } ,100);
  }
}
