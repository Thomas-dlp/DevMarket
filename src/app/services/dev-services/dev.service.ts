import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Dev } from "../../templates/dev.template";
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { environment } from "../../../environments/environments";

@Injectable()
export class DevService{
    private studioId$= new BehaviorSubject<string|null>(null);
    devs$= this.studioId$.pipe(
        switchMap(id=>this.http.get(`api/devs?studioId=${id}`)) //todo, set a more complete query
    );
    constructor(private http: HttpClient){}

    setStudioId(id:string):void {
        this.studioId$.next(id);
    }


}