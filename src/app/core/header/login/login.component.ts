import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';
import { AuthService } from '../../../services/auth-services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone:true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  
  buttonText$!:Observable<string>;

  constructor(private router:Router, private authService: AuthService){}
 
  ngOnInit(): void {
    
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('authToken');
    if (token){return true}
    else{return false}
  }


  onClick(){
    if (this.isAuthenticated()) {
      this.authService.logOut();
    } else {
      this.router.navigateByUrl('auth-studio');
    }
  }
  
}
