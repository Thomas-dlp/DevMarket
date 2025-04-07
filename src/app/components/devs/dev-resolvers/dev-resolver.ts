import{Injectable} from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router"
import {Dev} from "../../../templates/dev.template";
import {ProjectService} from "../../../services/project-services/project.service";
import { DevService } from '../../../services/dev-services/dev.service';

@Injectable()
export class DevResolver implements Resolve<Dev[]>{
   
   constructor(private devService: DevService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Dev[]> {
        return this.devService.devs$;
    }
    
   
}