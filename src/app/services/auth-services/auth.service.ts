import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { LoginResponse } from "../../templates/login-response.template";
import {  catchError, delay, finalize, Observable, throwError } from "rxjs";
import { LoginCredentials } from "../../templates/login-credentials.template";
import { RegistrationCredentials } from "../../templates/registration-credentials.template";
import { LoadingService } from "../loading-service";

@Injectable()
export class AuthService{
    
    constructor(private http:HttpClient, private loadingService:LoadingService){}

    login(loginCredentials:LoginCredentials):Observable<LoginResponse>{
        this.loadingService.setLoading(true);
        return this.http.post<LoginResponse>(`${environment.apiUrl}/StudioAuth/login`, loginCredentials).pipe(
            catchError(error=>{
                console.error("Login error",error);
                return throwError(()=>new Error("Login failed"));
            }),
            finalize(()=>this.loadingService.setLoading(false))
        );
    }

    createNewUser(registrationCredentials: RegistrationCredentials):Observable<LoginResponse>{
        this.loadingService.setLoading(true);
        return this.http.post<LoginResponse>(`${environment.apiUrl}/StudioAuth/register`, registrationCredentials).pipe(
            catchError(error=>{
                console.error("Registration error.Sent from angular",error);
                return throwError(()=>new Error("Registration failed"));
            }),
            finalize(()=>this.loadingService.setLoading(false))
        );
    }
}