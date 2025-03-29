import { TestBed } from "@angular/core/testing";
import { StudioPageService } from "./studio-page.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environments";
import { of } from "rxjs";
import { StudioPage } from "../../templates/studio-page.template";
import { Studio } from "../../templates/studio.template";

describe('StudioPageService',()=>{
    let service: StudioPageService;
    let http: jasmine.SpyObj<HttpClient>;
    const studioPage:StudioPage={
        id:"",
        name:"",
        logoUrl:"",
        backgroundPictureUrl:"",
        abstract:"",
        bio:"",
        settings:[""]
    };
    const studio:Studio={
        id: "",
        name: "",
        projects: [],
        description: ""
    };
    beforeEach(async()=>{
        http=  jasmine.createSpyObj(HttpClient,['get']);
        TestBed.configureTestingModule({
            providers:[
                StudioPageService,
                {provide: HttpClient, useValue:http},
            ],
        }).compileComponents();
        service= TestBed.inject(StudioPageService);
    });

    it('should create service',()=>{
        expect(service).toBeTruthy();
    });

    it('should call the right URL on getStudioPageById',()=>{
        http.get.and.returnValue(of(studioPage));

        service.getStudioPageById("testId");

        expect(http.get).toHaveBeenCalledWith(`${environment.apiUrl}/StudioPage/testId`);
    });

    it('should call the right URL on getDevsByStudioId',()=>{
        http.get.and.returnValue(of([studio]));

        service.getDevsByStudioId("testId");

        expect(http.get).toHaveBeenCalledWith(`${environment.apiUrl}/.../testId`);
    });
});