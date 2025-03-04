import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project-templates/project-template';
import { ProjectService } from '../project-services/project.service';
import { Observable, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {

  project$!:Observable<Project>;

  constructor(private projectService: ProjectService, private route: ActivatedRoute){}
  
  ngOnInit(): void {
    const projectId= this.route.snapshot.params['id'];
    this.project$= this.projectService.getSingleProjectById(projectId);
    this.project$.pipe(tap(project=>console.log(project.title)),take(1)).subscribe();
  }


}
