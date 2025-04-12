import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Dev } from "../../templates/dev.template";
import { BehaviorSubject, map, Observable, of, switchMap } from "rxjs";
import { environment } from "../../../environments/environments";
import { LoadingService } from "../loading-services/loading.service";
import { LightElement } from "../../templates/light-element.template";

@Injectable()
export class DevService{
    private studioId$= new BehaviorSubject<string|null>(null);
    private devsSubject = new BehaviorSubject<Dev[]>([]);
    devs$=this.devsSubject.asObservable();
    studioName$= this.studioId$.pipe(
        switchMap(id=>{
            if(id){
               
                return this.getLightStudios().pipe(
                    map(studios=>studios?.find(studio=>studio.id===id)?.title??"")
                );
            }else{
               return of("");
            }
        })
    );

   
    constructor(private http: HttpClient, private loadingService: LoadingService){}


    setStudioId(id:string):void {
        this.studioId$.next(id);
    }


    loadDevs(): void {
        this.getDevs().subscribe(devs => {
          this.devsSubject.next(devs);  // Emit the data into the BehaviorSubject
        });
    }

    private getDevs(): Observable<Dev[]> {
        return this.studioId$.pipe(
            switchMap(id=>{
                if(id){
                    return this.http.get<Dev[]>(`${environment.apiUrl}/devs?studioId=${id}`) 
                }else{
                   return this.http.get<Dev[]>(`${environment.apiUrl}/devs`)
                }
            }
        ));
    }

    createNewDev(newDev:any):Observable<Dev>{ 
        this.loadingService.setLoading(true);
        var dev= this.http.post<Dev>(`${environment.apiUrl}/devs`,newDev);
        this.loadingService.setLoading(false);
        return dev;
    }       

    getSingleDevById(id:string): Observable<Dev>{
       return this.http.get<Dev>(`${environment.apiUrl}/devs/${id}`);
    }

    getLightStudios():Observable<LightElement[]>{
        return this.http.get<LightElement[]>(`${environment.apiUrl}/studios/light`);
    }

    getLightTags():Observable<LightElement[]>{
        return this.http.get<LightElement[]>(`${environment.apiUrl}/tags/light`);
    }

    

}