import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Dev } from '../../../templates/dev.template';
import { DevService } from '../../../services/dev-services/dev.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import{StudioService} from '../../../services/studio-services/studio.service';

@Component({
  selector: 'app-dev',
  imports: [AsyncPipe,CommonModule],
  templateUrl: './dev.component.html',
  styleUrl: './dev.component.scss'
})
export class DevComponent {
project$!:Observable<Dev>;

  constructor(private devService: DevService, private studioService: StudioService, private route: ActivatedRoute){}
  
  ngOnInit(): void {
    const projectId= this.route.snapshot.params['id'];
    this.project$= this.devService.getSingleDevById(projectId);
    const studioName= this.project$.pipe(
      tap(this.studioService.studioId=projectId),
      switchMap(project=>
        
        this.studioService.getStudioPage().pipe(
          map(studioPage=>studioPage.name)
        ) //todo : add method to dev service to fetch name from id? or add it to the dev properties?
      )
      
    )
  }
}
    