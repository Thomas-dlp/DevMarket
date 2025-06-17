import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, startWith, take, tap } from 'rxjs';
import { Dev } from '../../../templates/dev.template';
import { DevService } from '../../../services/dev-services/dev.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DevListItemComponent } from "../dev-list-item/dev-list-item.component";
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterSelection } from '../../../templates/filter-selection.template';
import { FilterSelectionComponent } from '../../shared/filter-selection/filter-selection.component';
import { FilterDisplayComponent } from "../../shared/filter-display/filter-display.component";
import { ItemsPerPageFilterComponent } from "../../shared/items-per-page-filter/items-per-page-filter.component";
import { TitleSearchComponent } from "../../shared/title-search/title-search.component";
import { StudioService } from '../../../services/studio-services/studio.service';
import { TagService } from '../../../services/tag-services/tag.service';

@Component({
  selector: 'app-dev-list',
  standalone:true,
  imports: [DevListItemComponent, ReactiveFormsModule, AsyncPipe, CommonModule, FilterSelectionComponent, FilterDisplayComponent, ItemsPerPageFilterComponent, TitleSearchComponent],
  templateUrl: './dev-list.component.html',
  styleUrl: './dev-list.component.scss'
})
export class DevListComponent implements OnInit {


  devs$!: Observable<Dev[]>;
  filteredDevs$!:Observable<Dev[]>;
  filterSelection$!:Observable<FilterSelection[]>;
  titleSuggestions$!: Observable<string[]>;
  
  tagFilters$= new BehaviorSubject<string[]>([]);
  studioFilter$= new BehaviorSubject<string>("");
  searchCtrl= new FormControl("");
  itemPerpageCtrl = new FormControl(20);
  
  constructor(protected devService: DevService,
              private studioService: StudioService,
              private tagService: TagService,
              private activeRoute: ActivatedRoute,
              private router:Router
  ){}

  ngOnInit(): void {
    this.filterSelection$=this.setFilterSelection();
    this.activeRoute.queryParams.subscribe(params=>{
      const studioId =params['studioId'];
      if(studioId){
        this.devService.setStudioId(studioId);
      };
    });
    this.devs$=this.devService.devs$;
    this.titleSuggestions$=this.devs$.pipe(      //todo: suggest only the titles availables after first filtration. Therefore split firltration into several steps.
      map(devs=>devs.map(dev=>dev.title))
    );
    this.filteredDevs$=combineLatest([this.devs$,this.searchCtrl.valueChanges.pipe(startWith("")),this.tagFilters$.pipe(startWith([])),this.itemPerpageCtrl.valueChanges.pipe(startWith(20))
    ]).pipe(
      map(([devs,title,tags,capacity])=>
        devs.filter(dev=>
          (title ? dev.title.toLowerCase().includes(title.toLowerCase()) : true) &&
          (tags.some(tag => dev.tags?.includes(tag)) || tags.length === 0)
        ).slice(0,capacity??20)
      )
    );
    this.filteredDevs$.subscribe(devs=>console.log("filteredDevs:",devs))
    this.devService.loadDevs();
  }

  routeToComponent(dev:Dev){
    this.router.navigateByUrl(`dev/${dev.id}`);
  }

  addNewFilter(filter:{type:string,output:string}){
    if(filter.type==='Studios'){
      this.getStudioIdFromName(filter.output)
        .subscribe(id=> {
          this.devService.setStudioId(id);
        })
      this.studioFilter$.next(filter.output); //todo: matching erro possible with studio Id
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
    return combineLatest([this.studioService.getLightStudios(),this.tagService.getLightTags()]).pipe(
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
    this.studioFilter$.next("");
  }

  navigateToStudio(studioName: string) {
    this.getStudioIdFromName(studioName).subscribe(studioId=>{this.router.navigateByUrl(`studio/${studioId}/page`)});
  }

  getStudioIdFromName(name:string):Observable<string>{
   return this.studioService.getLightStudios().pipe(
      take(1),
      map(lightStudios=>
        lightStudios.find(lStudio=>lStudio.title.toLocaleLowerCase()===name.toLocaleLowerCase())?.id??""),
      );
  }
  
}
