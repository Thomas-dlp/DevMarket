import { Injectable } from '@angular/core';
import { CachedResource } from '../cache-services/cached-resource.service';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { LightElement } from '../../templates/light-element.template';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private lightTags= new CachedResource(()=>this.http.get<LightElement[]>(`${environment.apiUrl}/tags/light`));
  
  constructor(private http: HttpClient) { }

  getLightTags():Observable<LightElement[]>{
    return this.lightTags.values$;
  }

}
