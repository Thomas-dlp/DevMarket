import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, isEmpty, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { Dev } from '../../../templates/dev.template';
import { DevService } from '../../../services/dev-services/dev.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DevListItemComponent } from "../dev-list-item/dev-list-item.component";
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LightElement } from '../../../templates/light-element.template';

@Component({
  selector: 'app-dev-list',
  imports: [DevListItemComponent,ReactiveFormsModule, AsyncPipe, CommonModule],
  templateUrl: './dev-list.component.html',
  styleUrl: './dev-list.component.scss'
})
export class DevListComponent implements OnInit {

  devs$!: Observable<Dev[]>;
  studioName$!:Observable<string>;
  filteredDevs$!:Observable<Dev[]>;
  filterSuggestions$!: Observable<LightElement[]>;
  titleSuggestions$!: Observable<string[]>;
  
  tagFilter$= new BehaviorSubject<string[]>([]);
  filterLinkedToform$= new BehaviorSubject<string>("studios");
  
  showFilterSuggestions:boolean=false;
  showTitleSuggestions:boolean=false;


  searchCtrl!: FormControl;
  filterCtrl!: FormControl;
  elementByPageCtrl!: FormControl;


  constructor(private devService: DevService,
              private activeRoute: ActivatedRoute,
              private router:Router
  ){}

  ngOnInit(): void {
    this.initFormControls();
    this.activeRoute.queryParams.subscribe(params=>{
      const studioId =params['studioId'];
      if(studioId){
        this.devService.setStudioId(studioId);
      };
    });
    this.studioName$=this.devService.studioName$;
    this.filterSuggestions$=this.setFilterSuggestions();
    this.titleSuggestions$=this.setTitleSuggestions();
    this.devs$=this.devService.devs$;
    this.filteredDevs$=combineLatest([this.devs$,this.searchCtrl.valueChanges.pipe(startWith("")),this.tagFilter$.pipe(startWith([""])),this.elementByPageCtrl.valueChanges.pipe(startWith(20))
    ]).pipe(
      map(([devs,title,tags,capacity])=>
        devs.filter(dev=>
          (title ? dev.title.toLowerCase().includes(title.toLowerCase()) : true) &&
          (tags.some(tag => dev.tags?.includes(tag)) || tags.length === 0)
        ).slice(0,parseInt(capacity,10))
      )
    );
    this.filteredDevs$.subscribe(devs=>console.log("filteredDevs:",devs))
    this.devService.loadDevs();
  }

  initFormControls(){
    this.elementByPageCtrl= new FormControl(20);
    this.searchCtrl=new FormControl("");
    this.filterCtrl= new FormControl("");
  }

  routeToComponent(dev:Dev){
    this.router.navigateByUrl(`dev/${dev.id}`);
  }

  setFilterlinkedToForm(filter:Event){
    const selectedFilter=(filter.target as HTMLSelectElement).value;
    this.filterLinkedToform$.next(selectedFilter);
  }

  setTitleSuggestions():Observable<string[]>{
    return this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
      switchMap((value:string)=>{
        return this.devs$.pipe(
          map(devs=>devs.filter(dev=>dev.title.toLowerCase().includes(value.toLocaleLowerCase())).map(dev=>dev.title)),
          
        );
      })
    )
  }

  setFilterSuggestions(): Observable<LightElement[]> {
    return combineLatest([
      this.filterCtrl.valueChanges.pipe(startWith("")),
      this.filterLinkedToform$.pipe(startWith("studios"))
    ]).pipe(
      debounceTime(300),
      switchMap(([text, filterType]) => {
        const input = text?.trim().toLowerCase() ?? '';
        if (!input) return of([]);
  
        if (filterType === 'studios') {
          return this.devService.getLightStudios().pipe(
            map(studios =>
              studios.filter(studio =>
                studio.title?.toLowerCase().includes(input)
              )
            )
          );
        } else if (filterType === 'tags') {
          return this.devService.getLightTags().pipe(
            map(tags =>
              tags.filter(tag =>
                tag.title?.toLowerCase().includes(input)
              )
            )
          );
        } else {
          return of([]);
        }
      })
    );
  }
  
  autoCompleteSuggestion(suggestion:string){
    this.searchCtrl.setValue(suggestion);
  }

  addSuggestionToFilters(suggestion:LightElement){
    if(this.filterLinkedToform$.getValue()=="studios"){
      this.devService.setStudioId(suggestion.id);
    }else if(this.filterLinkedToform$.getValue()=="tags"){
      const currentTags=this.tagFilter$.value;
      const matchingTag=currentTags.find(tag=>tag===suggestion.title);
      let newTags= currentTags;
      if (!matchingTag){
        this.tagFilter$.next(currentTags.concat(suggestion.title));
      }
    }
  }

  onMouseEnterTitleForm() {
    this.showTitleSuggestions = true;
    console.log("enter mouse");
  }

  onMouseLeaveTitleForm() {
    setTimeout(() =>{
    this.showTitleSuggestions=false;
    console.log("leave mouse");},100)
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

  deleteStudioFilter(input: string){
    this.devService.setStudioId("");
  }

  deleteTagFilter(input:string){
    const currentTags= this.tagFilter$.getValue();
    const updatedTags= currentTags.filter(tag=>tag!==input)
    this.tagFilter$.next(updatedTags);
  }
 



}
