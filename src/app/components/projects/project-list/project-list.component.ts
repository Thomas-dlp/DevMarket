import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/auth-service/project-services/project.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProjectListItemComponent } from "../project-list-item/project-list-item.component";
import{ActivatedRoute, Router} from '@angular/router'
import { Project } from '../project-templates/project-template';
import{ProjectResolver} from '../project-resolvers/project-resolver';

@Component({
  selector: 'app-project-list',
  imports: [CommonModule, ProjectListItemComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {

  
   projects$!:Observable<any[]>;

  constructor(private projectServices: ProjectService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              
  ){}
  
  ngOnInit(): void {
    this.projects$=this.activatedRoute.data.pipe(
      map(data=>data['projects'])
    );
    
  }

  RouteToComponent(project:Project) {
    this.router.navigateByUrl(`projects/${project.id}`);
    }

}
