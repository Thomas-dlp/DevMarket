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

@Injectable({
    providedIn:'root'
})
export class StudioService{
    
    studioId!:string;
    private _actualities$= new BehaviorSubject<DisplayableElement[]>([]);

    constructor(private http:HttpClient, private loadingService: LoadingService){}

    getStudioProfile(): Observable<StudioProfile>{
        return this.http.get<StudioProfile>(`${environment.apiUrl}/studios/${this.studioId}/profile`);
    }
    getDevs():Observable<Studio[]>{
        return this.http.get<Studio[]>(`${environment.apiUrl}/.../${this.studioId}`);
    }
    getStudioPage(): Observable<StudioPage>{
        return this.http.get<StudioPage>(`${environment.apiUrl}/studios/${this.studioId}/page`);
    }

    getLightDevs():Observable<LightElement[]>{
        return this.http.get<LightElement[]>(`${environment.apiUrl}/studios/${this.studioId}/devs/light`);
    }

    getLightPosts():Observable<LightElement[]>{
        return this.http.get<LightElement[]>(`${environment.apiUrl}/studios/${this.studioId}/posts/light`);
    }

    getLightTradingStatus():Observable<LightElement[]>{
        return this.http.get<LightElement[]>(`${environment.apiUrl}/studios/${this.studioId}/tradingStatus/light`);
    }

    updateForm(studioProfileUpdate: any) {
        return this.http.patch(`${environment.apiUrl}/studios/${this.studioId}/profile`,studioProfileUpdate);
    }

    
    
    get actualities$(): Observable<DisplayableElement[]> {
        return this._actualities$.asObservable();
    }
    
    addActuality(reference: DisplayableElementReference){
        this.http.put<DisplayableElement[]>(`${environment.apiUrl}/studios/${this.studioId}/actualities`, reference).pipe(
            tap(element => {
              const elementsToAdd = Array.isArray(element) ? element : [element];
              const updatedActualities = [...this._actualities$.value, ...elementsToAdd];
              this._actualities$.next(updatedActualities);
            }),
            catchError(error => {
              console.error('Failed to add actuality:', error);
              return throwError(() => new Error('Failed to add actuality'));
            })
          ).subscribe();
    }

    getAllActualities(){
        this.http.get<DisplayableElement[]>(`${environment.apiUrl}/studios/${this.studioId}/actualities`).subscribe(data=>{
            console.log('Received actualities:', data);
            this._actualities$.next(data);}
        );
            
    }

    getBatchActualities(references: { type: any; id: number }[]) {
        this.http.post<DisplayableElement[]>(`${environment.apiUrl}/studios/${this.studioId}/actualities/batchFetch`, references).pipe(
            tap(data=>this._actualities$.next(data)),
            catchError((error) => {
                return throwError(() => new Error('Failed to load actualities'));
            })
        ).subscribe();
    }

    modifyActualityById(formerId:string,newId: string){
    }

    deleteActualityById(id:string){
        this.http.delete(`${environment.apiUrl}/studios/${this.studioId}/actualities/${id}`).pipe(
            catchError(error => {
              return throwError(() => new Error('Failed to delete actuality'));
            })
          ).subscribe();
          const updatedActualities = this._actualities$.value.filter(value=>value.id!==id);
          this._actualities$.next(updatedActualities);
    }
    
    
    drop(event: CdkDragDrop<DisplayableElement[]>) {
        const data = this._actualities$.value;
      
        if (event.previousIndex !== event.currentIndex) {
          // Update the local array order
          moveItemInArray(data, event.previousIndex, event.currentIndex);
          this._actualities$.next([...data]);
      
          const refA = data[event.previousIndex];
          const refB = data[event.currentIndex];
      
          // Send order change to backend
          this.changeOrder(refA, refB).subscribe();
        }
    }

    changeOrder(refA:any,refB:any):Observable<any>{
        return of();
    }

}
