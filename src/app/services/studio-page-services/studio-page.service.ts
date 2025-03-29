import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environments";
import { StudioPage } from "../../templates/studio-page.template";
import { Studio } from "../../templates/studio.template";

@Injectable()
export class StudioPageService {
    constructor(private http:HttpClient){}
    
     getStudioPageById(id: string): Observable<StudioPage>{
            return this.http.get<StudioPage>(`${environment.apiUrl}/StudioPage/${id}`);
        }

     getDevsByStudioId(id:string):Observable<Studio[]>{
        return this.http.get<Studio[]>(`${environment.apiUrl}/.../${id}`);

     }   
}
