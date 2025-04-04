import { TestBed } from "@angular/core/testing";
import { StudioService } from "./studio.service";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { environment } from "../../../environments/environments";
import { StudioProfile } from "../../templates/studio-profile.template";

describe('StudioProfileService',()=>{
    let service: StudioService;
    let http: jasmine.SpyObj<HttpClient>;
    const studioProfile: StudioProfile={
        id: "",
        name: "",
        logoUrl: "",
        backgroundPictureUrl: "",
        abstract: "",
        bio: "",
        settings: []
    };
    beforeEach(async()=>{
        http=  jasmine.createSpyObj(HttpClient,['get','patch']);
        TestBed.configureTestingModule({
            providers:[
                StudioService,
                {provide: HttpClient, useValue:http},
            ],
        }).compileComponents();
        service= TestBed.inject(StudioService);
        service.studioId="testId";
    });

    it('should create service',()=>{
            expect(service).toBeTruthy();
        });
    
        it('should call the right URL on getStudioProfile',()=>{
            http.get.and.returnValue(of(studioProfile));
    
            service.getStudioProfile();
    
            expect(http.get).toHaveBeenCalledWith(`${environment.apiUrl}/Studio/testId/Profile`);
        });
    
        it('should updateForm',()=>{
    
            service.updateForm(studioProfile);
    
            expect(http.patch).toHaveBeenCalledWith(`${environment.apiUrl}/Studio/testId/Profile`,studioProfile);
        });
    
});