import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, isEmpty, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { Dev } from '../../../templates/dev.template';
import { DevService } from '../../../services/dev-services/dev.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DevListItemComponent } from "../dev-list-item/dev-list-item.component";
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterSelection } from '../../../templates/filter-selection.template';
import { FilterSelectionComponent } from '../../shared/filter-selection/filter-selection.component';
import { FilterDisplayComponent } from "../../shared/filter-display/filter-display.component";

@Component({
  selector: 'app-dev-list',
  standalone:true,
  imports: [DevListItemComponent, ReactiveFormsModule, AsyncPipe, CommonModule, FilterSelectionComponent, FilterDisplayComponent],
  templateUrl: './dev-list.component.html',
  styleUrl: './dev-list.component.scss'
})
export class DevListComponent implements OnInit {

  devs$!: Observable<Dev[]>;
  studioName$!:Observable<string>;
  filteredDevs$!:Observable<Dev[]>;
  filterSelection$!:Observable<FilterSelection[]>;
  titleSuggestions$!: Observable<string[]>;
  
  tagFilters$= new BehaviorSubject<string[]>([]);
  studioFilter$= new BehaviorSubject<string[]>([]);
  


  searchCtrl!: FormControl;
  
  elementByPageCtrl!: FormControl;



  constructor(protected devService: DevService,
              private activeRoute: ActivatedRoute,
              private router:Router
  ){}

  ngOnInit(): void {
    this.initFormControls();
    this.filterSelection$=this.setFilterSelection();
    this.activeRoute.queryParams.subscribe(params=>{
      const studioId =params['studioId'];
      if(studioId){
        this.devService.setStudioId(studioId);
      };
    });
    
    this.titleSuggestions$=this.setTitleSuggestions();
    this.devs$=this.devService.devs$;
    this.filteredDevs$=combineLatest([this.devs$,this.searchCtrl.valueChanges.pipe(startWith("")),this.tagFilters$.pipe(startWith([])),this.elementByPageCtrl.valueChanges.pipe(startWith(20))
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
    
  }

  routeToComponent(dev:Dev){
    this.router.navigateByUrl(`dev/${dev.id}`);
  }

 addNewFilter(filter:{type:string,output:string}){
    if(filter.type==='Studios'){
      this.devService.setStudioId(filter.output);
      this.studioFilter$.next([filter.output]);
    }else if(filter.type==='Tags'){
      const previousFilters= this.tagFilters$.getValue();
      const newFilter = filter.output;
      if (!previousFilters.includes(newFilter)){
        const actualizedFilters= [...previousFilters,newFilter];
        this.tagFilters$.next(actualizedFilters);
      }
    }
  }

  setFilterSelection():Observable<FilterSelection[]>{
    return combineLatest([this.devService.getLightStudios(),this.devService.getLightTags()]).pipe(
      map(([lightStudios, lightTags])=>
        [
          {name: "Studios", suggestions: lightStudios},
          {name: "Tags", suggestions: lightTags}
        ]
      )
    );
  }

  
  onStudioFilterDeletion(){
    this.devService.setStudioId("");
    this.studioFilter$.next([]);
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

  
  autoCompleteSuggestion(suggestion:string){
    this.searchCtrl.setValue(suggestion);
  }


}
