import { TestBed } from "@angular/core/testing";
import { StudioProfileService } from "./studio-profile.service";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { environment } from "../../../environments/environments";
import { StudioProfile } from "../../templates/studio-profile.template";

describe('StudioProfileService',()=>{
    let service: StudioProfileService;
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
                StudioProfileService,
                {provide: HttpClient, useValue:http},
            ],
        }).compileComponents();
        service= TestBed.inject(StudioProfileService);
    });

    it('should create service',()=>{
            expect(service).toBeTruthy();
        });
    
        it('should call the right URL on getStudioProfileById',()=>{
            http.get.and.returnValue(of(studioProfile));
    
            service.getStudioProfileById("testId");
    
            expect(http.get).toHaveBeenCalledWith(`${environment.apiUrl}/StudioProfile/testId`);
        });
    
        it('should updateForm',()=>{
    
            service.updateForm("testId",studioProfile);
    
            expect(http.patch).toHaveBeenCalledWith(`${environment.apiUrl}/StudioProfile/testId`,studioProfile);
        });
    
});