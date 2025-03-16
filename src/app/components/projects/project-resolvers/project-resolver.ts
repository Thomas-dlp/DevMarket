import{Injectable} from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router"
import {Project} from "../../../templates/project.template";
import {ProjectService} from "../../../services//project-services/project.service";

@Injectable()
export class ProjectResolver implements Resolve<Project[]>{
   
   constructor(private projectService: ProjectService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project[]> {
        return this.projectService.getProjects();
    }
    
   
}