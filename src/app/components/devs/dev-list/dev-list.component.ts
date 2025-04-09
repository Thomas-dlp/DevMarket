import { Component, OnInit } from '@angular/core';
import { debounceTime, Observable, switchMap } from 'rxjs';
import { Dev } from '../../../templates/dev.template';
import { DevService } from '../../../services/dev-services/dev.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DevListItemComponent } from "../dev-list-item/dev-list-item.component";
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dev-list',
  imports: [DevListItemComponent,ReactiveFormsModule, AsyncPipe, CommonModule],
  templateUrl: './dev-list.component.html',
  styleUrl: './dev-list.component.scss'
})
export class DevListComponent implements OnInit {
  

  devs$!:Observable<Dev[]>;
  

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
      }
    });
    this.devs$=this.devService.devs$;
  }

  changeStudio(studioId:string){
    this.devService.setStudioId(studioId);
  }

  routeToComponent(dev:Dev){
    this.router.navigateByUrl(`dev/${dev.id}`);
  }

  onSomtehing(){
  // this.searchCtrl.valueChanges.pipe(
  //   debounceTime(300),
  //   switchMap(value => {
  //     return this.devService.getDevsByName(value);
  //   })
  // ).subscribe(filteredDevs => {
  //   this.devs$ = filteredDevs;
  // });
}

onItemsPerPageChange(){
  
}

}
