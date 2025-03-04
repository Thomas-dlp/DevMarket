import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../project-templates/project-template';

@Injectable()
export class ProjectService {

  // projects$!:Observable<Project[]>

  constructor(private http:HttpClient) { }

  getProjects():Observable<any[]>{
   return this.http.get<any>("http://localhost:8080/getProjects.php"); // todo resolver
  }
}
