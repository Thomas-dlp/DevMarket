import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project-services/project.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProjectListItemComponent } from "../project-list-item/project-list-item.component";
import{Router} from '@angular/router'
import { Project } from '../project-templates/project-template';

@Component({
  selector: 'app-project-list',
  imports: [CommonModule, ProjectListItemComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {

  
   projects!:Observable<any[]>;

  constructor(private projectServices: ProjectService,
              private router: Router
  ){}
  
  ngOnInit(): void {
    this.projects=this.projectServices.getProjects();
    
  }

  RouteToComponent(project:Project) {
    this.router.navigateByUrl(`projects/${project.id}`);
    }

}
