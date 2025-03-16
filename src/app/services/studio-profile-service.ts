import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { StudioProfile } from "../templates/studio-profile.template";
import { Observable } from "rxjs";

@Injectable()
export class StudioProfileService{
    
    constructor(private http:HttpClient){}

    getStudioProfileById(id: string): Observable<StudioProfile>{
        return this.http.get<StudioProfile>(`${environment.apiUrl}/StudioProfile/${id}`);
    }

    updateForm(id:string, studioProfileUpdate: any) {
        return this.http.patch(`${environment.apiUrl}/StudioProfile/${id}`,studioProfileUpdate);
      }
}
