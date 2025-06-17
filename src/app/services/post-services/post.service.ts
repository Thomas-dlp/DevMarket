import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { LightElement } from '../../templates/light-element.template';
import { CachedResource } from '../cache-services/cached-resource.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private lightPosts= new CachedResource(()=>this.http.get<LightElement[]>(`${environment.apiUrl}/posts/light`))

  constructor(private http: HttpClient) { }

  getLightPosts():Observable<LightElement[]>{
       return this.lightPosts.values$;
    }
  
    
}
