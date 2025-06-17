import { BehaviorSubject, filter, Observable, of, pipe, take, tap } from "rxjs";

export class CachedResource<T extends object> {
  private cache = new BehaviorSubject<T|null>(null);
  private lastLoadedAt: number = 0;
  loading$= new BehaviorSubject<boolean>(false);
  

  constructor(
    private fetchFn: () => Observable<T>, 
    private cacheDuration = 60 * 1000,
  ) {}

  get values$():Observable<T>{
    if (this.isRefreshNeeded()){
        this.refresh();
    }    

    return this.cache.asObservable().pipe(
      filter(value => value !== null) 
    );
  }

  private isRefreshNeeded(): boolean{
    return (Date.now() - this.lastLoadedAt >= this.cacheDuration)
  }

  refresh(): void {
    this.loading$.pipe(take(1)).subscribe(isLoading=>{
        if(isLoading) return;
        this.loading$.next(true);
        this.fetchFn().pipe(take(1)).subscribe({
            next: data => {  //take(1) in case of the observable not beeing oneshot
                this.cache.next(data);
                this.lastLoadedAt = Date.now();
                this.loading$.next(false);
            },
            error: err=>{
                console.error('[CachedResource] Failed to refresh data', err);
                this.loading$.next(false);
            }    
        });
    });
  }

  updateCache(value: T): void {
    this.cache.next(value);
  }
  
}
