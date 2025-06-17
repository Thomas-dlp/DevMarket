import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LightElement } from '../../templates/light-element.template';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { CachedResource } from '../cache-services/cached-resource.service';

@Injectable({
  providedIn: 'root'
})
export class TraidingStatusService {

  private lightTraidingStatus= new CachedResource<LightElement[]>(()=> this.http.get<LightElement[]>(`${environment.apiUrl}/tradingStatus/light`));

  constructor(private http: HttpClient) { }

  getLightTradingStatus():Observable<LightElement[]>{
       return this.lightTraidingStatus.values$;
    }
}
