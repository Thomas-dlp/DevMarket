import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project-services/project.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProjectItemComponent } from "../project-item/project-item.component";
import { HttpClient, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-project-list',
  imports: [CommonModule, ProjectItemComponent],
  
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {
  
   projects!:Observable<any[]>;

  constructor(private projectServices: ProjectService){}
  
  ngOnInit(): void {
    this.projects=this.projectServices.getProjects();
    
  }


}
