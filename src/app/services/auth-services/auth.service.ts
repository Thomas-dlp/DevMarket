import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";

@Injectable()
export class AuthService{

    constructor(private http:HttpClient){}

    login(email:"",password:""):boolean{
        this.http.post<any>(environment.apiUrl,);
        console.log(`User email: ${email} \n User password: ${password}`);
        return true;
    }
    createNewUser():void{}
}