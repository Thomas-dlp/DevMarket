import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { StudioProfile } from "../../templates/studio-profile.template";
import { BehaviorSubject, catchError, finalize, Observable, of, tap, throwError } from "rxjs";
import { DisplayableElement } from "../../templates/displayable-element.template";
import { Studio } from "../../templates/studio.template";
import { StudioPage } from "../../templates/studio-page.template";
import { LightElement } from "../../templates/light-element.template";
import { LoadingService } from "../loading-services/loading.service";
import { DisplayableElementReference } from "../../templates/displayable-element-reference.template";
import {
    CdkDragDrop,
    moveItemInArray
  } from '@angular/cdk/drag-drop';
import { CachedResource } from "../cache-services/cached-resource.service";

@Injectable({
    providedIn:'root'
})
export class StudioService{
    
    private lightStudios= new CachedResource<LightElement[]>(()=>this.http.get<LightElement[]>(`${environment.apiUrl}/studios/light`));
    
    studioId!:string;

    constructor(private http:HttpClient, private loadingService: LoadingService){}

    getStudioProfile(): Observable<StudioProfile>{
        return this.http.get<StudioProfile>(`${environment.apiUrl}/studios/${this.studioId}/profile`);
    }
    // getDevs():Observable<Studio[]>{
    //     return this.http.get<Studio[]>(`${environment.apiUrl}/.../${this.studioId}`);
    // }
    getStudioPage(): Observable<StudioPage>{
        return this.http.get<StudioPage>(`${environment.apiUrl}/studios/${this.studioId}/page`);
    }

    getLightStudios():Observable<LightElement[]>{
        return this.lightStudios.values$;
    }

    updateStudioProfileForm(studioProfileUpdate: any) {
        console.log('patch request:',studioProfileUpdate);
        this.http.patch(`${environment.apiUrl}/studios/${this.studioId}/profile`, studioProfileUpdate)
        .subscribe({
            next: response => console.log('PATCH succeeded:', response),
            error: err => console.error('PATCH failed:', err)
         });
    }
    
    
    drop(event: CdkDragDrop<DisplayableElement[]>) {  //move to click and drop service (make it generic)
        // const data = this._actualities$.value;
      
        // if (event.previousIndex !== event.currentIndex) {
        //   // Update the local array order
        //   moveItemInArray(data, event.previousIndex, event.currentIndex);
        //   this._actualities$.next([...data]);
      
        //   const refA = data[event.previousIndex];
        //   const refB = data[event.currentIndex];
      
        //   // Send order change to backend
        //   this.changeOrder(refA, refB).subscribe();
        // }
    }

    changeOrder(refA:any,refB:any):Observable<any>{ // todo : mistake! can't inverse two refs with a clik and drop. (except if by design drop on other element to swap)
        return of(); 
    }

}
