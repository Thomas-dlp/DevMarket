import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, isEmpty, map, Observable, of, switchMap } from 'rxjs';
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
  

  devs$!:Observable<Dev[]>;
  filteredDevs$!:Observable<Dev[]>;
  filterSuggestions$!: Observable<LightElement[]>;

  tagFilter$= new BehaviorSubject<string[]>([]);
  filterLinkedToform$= new BehaviorSubject<string>("tag");
  
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
    this.activeRoute.queryParams.subscribe(params=>{
      const studioId =params['studioId'];
      if(studioId){
        this.devService.setStudioId(studioId);
      };
      this.filterSuggestions$=this.setFilterSugestionType();
    });
    
    this.filteredDevs$=combineLatest([this.devs$,this.searchCtrl.valueChanges,this.tagFilter$,this.elementByPageCtrl.valueChanges
    ]).pipe(
      map(([devs,title,tags,capacity])=>
        devs.filter(dev=>
          (title ? dev.title.toLowerCase().includes(title.toLowerCase()) : true) &&
          (tags?.some(tag => tags.includes(tag)) ?? true)
        ).slice(0,parseInt(capacity.value,10))
      )
    );
  
  }

  changeStudio(studioId:string){
    this.devService.setStudioId(studioId);
  }

  routeToComponent(dev:Dev){
    this.router.navigateByUrl(`dev/${dev.id}`);
  }

  setFilterlinkedToForm(filter:Event){
    const selectedFilter=(filter.target as HTMLSelectElement).value;
    this.filterLinkedToform$.next(selectedFilter);
  }

  setFilterSugestionType():Observable<LightElement[]>{
    return  this.filterLinkedToform$.pipe(
      switchMap(suggestion=>{
        if(suggestion==='studio'){
          return this.devService.getLightStudios();
        }else if( suggestion==='tag'){
          return this.devService.getLightTags();
        }else{
          return of([]);
        }
      })
    );
  }
  
  addSuggestionToFilters(suggestion:LightElement){
    if(this.filterLinkedToform$.getValue()=="studio"){
      this.devService.setStudioId(suggestion.id);
    }else if(this.filterLinkedToform$.getValue()=="tag"){
      const currentTags=this.tagFilter$.value;
      const matchingTag=currentTags.find(tag=>tag===suggestion.title);
      let newTags= currentTags;
      if (!matchingTag){
        this.tagFilter$.next(currentTags.concat(suggestion.title));
      }
    }
  }

  onMouseEnter() {
    this.showFilterSuggestions = true;
  }

  onMouseLeave() {
    // Optional: delay hiding to allow click
    setTimeout(() => this.showFilterSuggestions = false, 0);
    this.filterCtrl.reset();
    this.filterSuggestions$=of([])
  }

  onSomtehing(){
  // this.searchCtrl.valueChanges.pipe(
  //   debounceTime(300),
  //   swi tchMap(value => {
  //     return this.devService.getDevsByName(value);
  //   })
  // ).subscribe(filteredDevs => {
  //   this.devs$ = filteredDevs;
  // });
}

onItemsPerPageChange(){
  
}

}
