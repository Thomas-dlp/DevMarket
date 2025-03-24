import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Dev } from "../templates/dev.template";
import { Observable } from "rxjs";
import { environment } from "../../environments/environments";

@Injectable()
export class DevServices{
    
constructor(private http: HttpClient){}

getDevsbyStudio(studioid:string): Observable<Dev[]>{
    return this.http.get<Dev[]>(`${environment.apiUrl}`);
}


}