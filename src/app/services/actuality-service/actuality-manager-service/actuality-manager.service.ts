import { inject, Inject, Injectable, InjectionToken } from '@angular/core';
import { CachedResource } from '../../cache-services/cached-resource.service';
import { DisplayableElement } from '../../../templates/displayable-element.template';
import { ActualityService } from '../actuality.service';
import { HttpClient } from '@angular/common/http';
import { DisplayableElementReference } from '../../../templates/displayable-element-reference.template';
import { LightElement } from '../../../templates/light-element.template';
import { catchError, map, switchMap, take, tap } from 'rxjs';
import { PARENT_ID } from '../../../components/shared/tokens/tokens';
import { environment } from '../../../../environments/environments';


@Injectable()
export class ActualityManager {
  
  private readonly cache: CachedResource<DisplayableElement[]>;
  private http= inject(HttpClient);
  private actualityService= inject(ActualityService);
  
  
  constructor(@Inject(PARENT_ID) public parentId: string) {
    this.cache=new CachedResource(() =>
      this.http.get<DisplayableElement[]>(`${environment.apiUrl}/studios/${this.parentId}/actualities`)); // todo check api call
  }
  


  get actualities$() {
    return this.cache.values$;
  }

  reorder(actuality: DisplayableElement, newOrder: number) {
    this.actualityService.reorderActuality(actuality.id, newOrder);
  }

  addActualityWithOptimisticPreview(reference: DisplayableElementReference, parentId: string, lightElement: LightElement){
     //add loading logic
    const previewElement={order: reference.Order,id:reference.DisplayableElementId, title: lightElement.title} as DisplayableElement; // optimistic preview
    const updatedCache= this.cache.values$.pipe(
      take(1),
      tap(values=>this.cache.updateCache(values.concat(previewElement)))
    ).subscribe(); 
    
    this.actualityService.addActualityReferenceAndFetchElement(reference, parentId).subscribe({ //replace preview by backend value
      next: returnedValue=>{
        this.replaceElementInCache(previewElement.id,returnedValue) //todo: check how ids are defined fo displayable elements
        //add loading logic
      },
      error: err=>{
        console.error('Failed to register the actuality.');
        this.deleteElementFromCache(previewElement.id);
        //ad loading logic
      }  
    });
  }

  removeActualityById(id: string) {
    return this.actualityService.removeActualityById(this.parentId, id).pipe( //Is actualitydefined by its own id, or by its lightElement id?
      tap(() => this.cache.refresh())
    );
  }

  modifyActualityById(previousId: string, replacementId: string){

  }
  
  private replaceElementInCache(idToReplace: string, replacementValue: DisplayableElement) {
    this.cache.values$.pipe(take(1)).subscribe(values => {
      const updated = values.map(item =>
        item.id === idToReplace ? replacementValue : item
      );
      this.cache.updateCache(updated);
    });
  }

  private deleteElementFromCache(idToDelete: string): void {
    this.cache.values$.pipe(take(1)).subscribe(values => {
      const updated = values.filter(item => item.id !== idToDelete);
      this.cache.updateCache(updated);
    });
  }

}

