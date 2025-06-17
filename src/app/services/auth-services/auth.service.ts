import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { LoginResponse } from "../../templates/login-response.template";
import {  BehaviorSubject, catchError, delay, finalize, Observable, tap, throwError } from "rxjs";
import { LoginCredentials } from "../../templates/login-credentials.template";
import { RegistrationCredentials } from "../../templates/registration-credentials.template";
import { LoadingService } from "../loading-services/loading.service";
import { Router } from "@angular/router";

@Injectable({providedIn:'root'})
export class AuthService{

    
    constructor(private http:HttpClient, private loadingService:LoadingService, private router: Router){}

    login(loginCredentials:LoginCredentials):Observable<LoginResponse>{
        this.loadingService.setLoading(true);
        return this.http.post<LoginResponse>(`${environment.apiUrl}/studio-auth/login`, loginCredentials).pipe(
            tap(response => {
                console.log("saving token:",response.token);
                sessionStorage.setItem('authToken', response.token);
                sessionStorage.setItem('studioId', response.id)
            }),
                
            catchError(error=>{
                console.error("Login error",error);
                return throwError(()=>new Error("Login failed"));
            }),
            finalize(()=>this.loadingService.setLoading(false))
        );
    }

    createNewUser(registrationCredentials: RegistrationCredentials):Observable<LoginResponse>{
        this.loadingService.setLoading(true);
        return this.http.post<LoginResponse>(`${environment.apiUrl}/studio-auth/register`, registrationCredentials).pipe(
            catchError(error=>{
                console.error("Registration error",error);
                return throwError(()=>new Error("Registration failed"));
            }),
            finalize(()=>this.loadingService.setLoading(false))
        );
    }

    logOut(){
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('studioId');
        this.router.navigateByUrl("");
    }

    isAuthenticated(): Observable<boolean> {
        const token = sessionStorage.getItem('authToken');
        return new Observable<boolean>(observer => {
          observer.next(!!token); 
          observer.complete();
        });
    }
}