import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { StudioProfile } from "../../templates/studio-profile.template";
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from "rxjs";
import { DisplayableElement } from "../../templates/displayable-element.template";
import { Studio } from "../../templates/studio.template";
import { StudioPage } from "../../templates/studio-page.template";
import { LightElement } from "../../templates/light-element.template";
import { LoginResponse } from "../../templates/login-response.template";
import { LoadingService } from "../loading-services/loading.service";
import { Dev } from "../../templates/dev.template";

@Injectable({
    providedIn:'root'
})
export class StudioService{
    
    studioId!:string;
    private _actualities$= new BehaviorSubject<DisplayableElement[]>([]);

    constructor(private http:HttpClient, private loadingService: LoadingService){}

    getStudioProfile(): Observable<StudioProfile>{
        return this.http.get<StudioProfile>(`${environment.apiUrl}/Studio/${this.studioId}/Profile`);
    }
    getDevs():Observable<Studio[]>{
        return this.http.get<Studio[]>(`${environment.apiUrl}/.../${this.studioId}`);
    }
    getStudioPage(): Observable<StudioPage>{
        return this.http.get<StudioPage>(`${environment.apiUrl}/Studio/${this.studioId}/Page`);
    }

    getLightDevs():Observable<LightElement[]>{
        return this.http.get<LightElement[]>(`${environment.apiUrl}/Studio/${this.studioId}/Devs/Light`);
    }

    getLightPosts():Observable<LightElement[]>{
        return this.http.get<LightElement[]>(`${environment.apiUrl}/Studio/${this.studioId}/Posts/Light`);
    }

    getLightTradingStatus():Observable<LightElement[]>{
        return this.http.get<LightElement[]>(`${environment.apiUrl}/Studio/${this.studioId}/TradingStatus/Light`);
    }

    updateForm(studioProfileUpdate: any) {
        return this.http.patch(`${environment.apiUrl}/Studio/${this.studioId}/Profile`,studioProfileUpdate);
    }

    createNewDev(newDev:any):Observable<HttpResponse<Dev>>{ 
        this.loadingService.setLoading(true);
                return this.http.post<LoginResponse>(`${environment.apiUrl}/Dev`,newDev,{observe: 'response'}).pipe(
                    catchError(error=>{
                        console.error("Registration error",error);
                        return throwError(()=>new Error("Registration failed"));
                    }),
                    finalize(()=>this.loadingService.setLoading(false))
                );
    }
    
    get actualities$(): Observable<DisplayableElement[]> {
        return this._actualities$.asObservable();
    }  

    getBatchActualities(references: { type: any; id: number }[]) {
        this.http.post<DisplayableElement[]>(`${environment.apiUrl}/Studio/${this.studioId}/activities/batchFetch`, references).pipe(
            tap(data=>this._actualities$.next(data)),
            catchError((error) => {
                console.error('Failed to fetch actualities:', error);
                return throwError(() => new Error('Failed to load actualities'));
            })
        ).subscribe();
    }

    modifyActualityById(formerId:string,newId: string){
       
    }

    deleteActualityById(id:string){}
      
}
