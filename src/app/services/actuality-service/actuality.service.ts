import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DisplayableElementReference } from '../../templates/displayable-element-reference.template';
import { DisplayableElement } from '../../templates/displayable-element.template';
import { environment } from '../../../environments/environments';
import { CachedResource } from '../cache-services/cached-resource.service';
import { LightDev } from '../../templates/light-dev.template';
import { map, Observable, tap } from 'rxjs';
import { LightElement } from '../../templates/light-element.template';

@Injectable({
  providedIn: 'root'
})
export class ActualityService {
  private cachedLightDevs = new CachedResource<LightDev[]>(()=>this.http.get<LightDev[]>(`${environment.apiUrl}/devs/light`));
  
  constructor(private http: HttpClient) { }
  
  /// Send a request to the backend to append the given DisplayableElement associated with its parent in the database. return the added actuality.
  addActualityReferenceAndFetchElement(reference: DisplayableElementReference, parentId: string): Observable<DisplayableElement>{
        return this.http.put<DisplayableElement>(`${environment.apiUrl}/studios/${parentId}/actualities`, reference); //todo check if the url request is still the most relevant
  }

  modifyActualityById(formerId:string,newId: string){
  }

  removeActualityById(id:string, parentId:string): Observable<boolean>{
    return this.http.delete<boolean>(`${environment.apiUrl}/studios/${parentId}/actualities/${id}`)
          
  }
  
  reorderActuality(actialityId: string, newOrder: number){}


  getLightElementsByParentId(parentId: string): Observable<LightElement[]>{
    const lightElements = this.cachedLightDevs.values$.pipe(
      map(devs=>devs.filter(dev=>dev.studioId===parentId))
    );

    return lightElements;
  }
}
