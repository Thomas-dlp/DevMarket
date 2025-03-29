import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { LoginCredentials } from "../../templates/login-credentials.template";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environments";
import { of, throwError } from "rxjs";
import { LoadingService } from "../loading-services/loading.service";
import { RegistrationCredentials } from "../../templates/registration-credentials.template";

describe('AuthService',()=>{
    let service: AuthService;
    let http: jasmine.SpyObj<HttpClient>;
    let loadingService:jasmine.SpyObj<LoadingService>;
    const loginCredentialsMock: LoginCredentials={
        email: "email",
        password:"password"
    };
    const registrationCredentialsMock: RegistrationCredentials={
        email: "email",
        password:"password",
        confirmPassword:"password"
    };

    beforeEach(async()=>{
        http= jasmine.createSpyObj('HttpClient',['post']);
        loadingService=jasmine.createSpyObj('LoadingService',['setLoading']);
        await TestBed.configureTestingModule({
            providers:[
                AuthService,
                {provide: HttpClient, useValue: http},
                {provide: LoadingService, useValue: loadingService},
            ],
        });
        service=TestBed.inject(AuthService);
    });

    it('it should create the service',()=>{
        expect(service).toBeTruthy();
    });

    it('should login',()=>{
       

        http.post.and.returnValue(of({})); 
        
        service.login(loginCredentialsMock);

        expect(http.post).toHaveBeenCalledWith(`${environment.apiUrl}/StudioAuth/login`, loginCredentialsMock);
    });

    it('should handle login errors',()=>{
        

        spyOn(console,'error');

        http.post.and.returnValue(throwError(()=>new Error('login failed')));
        
        
        service.login(loginCredentialsMock).subscribe({
            next: () => {},
            error: () => {}
        });
        
        expect(http.post).toHaveBeenCalledWith(`${environment.apiUrl}/StudioAuth/login`, loginCredentialsMock);
        expect(console.error).toHaveBeenCalledWith("Login error",jasmine.any(Error));
    });

    it('should handle loading when loading',()=>{
        
        http.post.and.returnValue(of([]));

        service.login(loginCredentialsMock).subscribe();
        
        expect(loadingService.setLoading).toHaveBeenCalledTimes(2);
        expect(loadingService.setLoading.calls.argsFor(0)).toEqual([true]); 
        expect(loadingService.setLoading.calls.argsFor(1)).toEqual([false]); 
        
    });

    it('should register',()=>{
        

        http.post.and.returnValue(of({})); 
        
        service.createNewUser(registrationCredentialsMock); //todo: change function name to register to harmonize with template

        expect(http.post).toHaveBeenCalledWith(`${environment.apiUrl}/StudioAuth/register`, registrationCredentialsMock);
    });

    it('should handle register errors',()=>{
        

        spyOn(console,'error');

        http.post.and.returnValue(throwError(()=>new Error('Registration error')));
        
        
        service.createNewUser(registrationCredentialsMock).subscribe({
            next: () => {},
            error: () => {}
        });
        
        expect(http.post).toHaveBeenCalledWith(`${environment.apiUrl}/StudioAuth/register`, registrationCredentialsMock);
        expect(console.error).toHaveBeenCalledWith("Registration error",jasmine.any(Error));
    });

    it('should handle loading when creating new user',()=>{
        http.post.and.returnValue(of([]));

        service.createNewUser(registrationCredentialsMock).subscribe();

        expect(loadingService.setLoading).toHaveBeenCalledTimes(2);
        expect(loadingService.setLoading.calls.argsFor(0)).toEqual([true]); 
        expect(loadingService.setLoading.calls.argsFor(1)).toEqual([false]); 

    });
});