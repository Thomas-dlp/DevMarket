import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, take } from 'rxjs';
import { Project } from '../../templates/project.template';

@Injectable()
export class ProjectService {


  constructor(private http:HttpClient) { }

  getProjects():Observable<Project[]>{
   return this.http.get<Project[]>("http://localhost:8080/getProjects.php"); // todo resolver
  }

  getSingleProjectById(id:number): Observable<Project>{
   return this.http.get<Project[]>("http://localhost:8080/getProjects.php").pipe(
    map(projects => {
      const project = projects.find(project => project.id === id);
      if (!project) {
        throw new Error("Project not found");
      }
      return project;
    })
  );}
  
}
