import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { DevService } from "./dev.service";
import { Dev } from "../../templates/dev.template";
import { of } from "rxjs";
import { environment } from "../../../environments/environments";

describe('DevService',()=>{
    let service:DevService;
    let http:jasmine.SpyObj<HttpClient>;
    const dev: Dev={
        id:"",
        studioId:"",
        title:"",
    }
    beforeEach(async()=>{
        http= jasmine.createSpyObj(HttpClient,['get']);
        TestBed.configureTestingModule({
            providers:[
                DevService,
                {provide: HttpClient, useValue:http},
            ]
        }).compileComponents();
        service=TestBed.inject(DevService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
      });

    it('should call the correct URL on getDevsbyStudio', () => {
        http.get.and.returnValue(of([dev]));

        service.getDevsbyStudio("");

        expect(http.get).toHaveBeenCalledWith(`${environment.apiUrl}`);
    });

});