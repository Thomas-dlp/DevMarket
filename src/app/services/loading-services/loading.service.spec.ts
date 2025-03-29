import { TestBed } from "@angular/core/testing";
import { LoadingService } from "./loading.service";

describe('LoadingService',()=>{
    let service: LoadingService;

    beforeEach(async()=>{
        await TestBed.configureTestingModule({
            providers:[
                LoadingService,
            ],
        }).compileComponents();
        service=TestBed.inject(LoadingService);
    });

    it('should create service',()=>{
        

        expect(service).toBeTruthy();
    });

    it('should have isLoading initialized to false', (done) => {
        service.loading$.subscribe((loading) => {
          expect(loading).toBe(false); 
          done();  
        });
      });
    

    
    it('shouldset loading to true',(done)=>{
        const spy = spyOn(service, 'setLoading').and.callThrough();

        service.setLoading(true);
      
        expect(spy).toHaveBeenCalledWith(true);
        
        service.loading$.subscribe((loading) => {
            expect(loading).toBe(true); 
            done();  
        });
    });

    it('shouldset loading to false',(done)=>{
        const spy = spyOn(service, 'setLoading').and.callThrough();

        service.setLoading(false);
      
        expect(spy).toHaveBeenCalledWith(false);

        service.loading$.subscribe((loading) => {
            expect(loading).toBe(false); 
            done();  
            });
        });

});