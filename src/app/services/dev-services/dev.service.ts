import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Dev } from "../../templates/dev.template";
import { BehaviorSubject, filter, map, Observable, of, switchMap } from "rxjs";
import { environment } from "../../../environments/environments";
import { LoadingService } from "../loading-services/loading.service";
import { LightElement } from "../../templates/light-element.template";
import { CachedResource } from "../cache-services/cached-resource.service";
import { LightDev } from "../../templates/light-dev.template";
import { DisplayableElementType } from "../../templates/displayable-element-reference.template";

@Injectable()
export class DevService{
    private studioId$= new BehaviorSubject<string|null>(null);
    private devsSubject = new BehaviorSubject<Dev[]>([]);
    devs$=this.devsSubject.asObservable();
    lightDevs = new CachedResource<LightDev[]>(() =>
                    this.http.get<(LightDev|null)[]>(`${environment.apiUrl}/devs/light`).pipe(
                        map(devs => devs.filter((dev): dev is LightDev => dev !== null))
                    )
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
                    console.warn("fetch studios with id:",id);
                    return this.http.get<Dev[]>(`${environment.apiUrl}/devs?studioId=${id}`) 
                }else{
                    console.warn("fetch all studios");
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

    getLightDevs():Observable<LightDev[]>{
        return this.lightDevs.values$.pipe(
                        map(devs => devs!.filter((dev): dev is LightDev => dev !== null)));
    }

    getLightDevsByStudioId(studioId:string):Observable<LightDev[]>{
        return this.lightDevs.values$.pipe(
            filter(devs=>devs!==null),
            map(devs=>devs.filter(dev=>dev.studioId==studioId ))
        );
    }

}