import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, map, Observable, of, startWith, take, tap } from 'rxjs';
import { AuthService } from '../../../services/auth-services/auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../../templates/login-response.template';
import { LoadingService } from '../../../services/loading-service';


@Component({
  selector: 'app-studio-auth-page',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './studio-auth-page.component.html',
  styleUrl: './studio-auth-page.component.scss'
})
export class StudioAuthPageComponent implements OnInit {

  loading$!:Observable<boolean>;

  authForm!: FormGroup;
  emailCtrl!: FormControl;
  passwordCtrl!: FormControl;

  newUserForm!: FormGroup;
  newEmailCtrl!:FormControl;
  newPasswordCtrl!:FormControl;
  newConfirmPasswordCtrl!:FormControl;

  newUser$=new BehaviorSubject<boolean>(false);
  toggleFormText= "I don't have an account";

  authErrorMessage!:string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private route: Router,
              private loadingService: LoadingService
  ){}


  ngOnInit(): void {
    this.loading$=this.loadingService.loading$;
    this.initFormControls();
    this.initMainform();
  }

  private initMainform():void{
    this.authForm=this.formBuilder.group({
      email:this.emailCtrl,
      password:this.passwordCtrl
    },{
      updateOn:'blur'
    });
    this.newUserForm=this.formBuilder.group({
      email:this.newEmailCtrl,
      password:this.newPasswordCtrl,
      confirmPassword: this.newConfirmPasswordCtrl
    },{
      updateOn:'blur'
    });
  }

  private initFormControls():void{
    this.emailCtrl=this.formBuilder.control('',Validators.required),
    this.passwordCtrl=this.formBuilder.control('',Validators.required),
    this.newEmailCtrl=this.formBuilder.control('',Validators.required),
    this.newPasswordCtrl=this.formBuilder.control('',Validators.required),
    this.newConfirmPasswordCtrl=this.formBuilder.control('',Validators.required)
  }

  private setLoginValidators(newUser:boolean): void{
    if (newUser){
      this.emailCtrl.clearValidators();
      this.passwordCtrl.clearValidators();
    }else{
      this.emailCtrl.addValidators([Validators.required,Validators.email]),
      this.passwordCtrl.addValidators(Validators.required)
    }
    this.emailCtrl.updateValueAndValidity();
    this.passwordCtrl.updateValueAndValidity();
  }
  
  private setNewUserValidators(newUser:boolean): void{
    if (newUser){
      this.newEmailCtrl.addValidators([Validators.required, Validators.email]),
      this.newPasswordCtrl.addValidators(Validators.required)
      this.newConfirmPasswordCtrl.addValidators(Validators.required)
    }else{
      this.newEmailCtrl.clearValidators();
      this.newPasswordCtrl.clearValidators();
      this.newConfirmPasswordCtrl.clearValidators();
      
    }
    this.newEmailCtrl.updateValueAndValidity();
    this.newPasswordCtrl.updateValueAndValidity();
    this.newConfirmPasswordCtrl.updateValueAndValidity();
  }

  toggleForm() {
    var newValue=!this.newUser$.value;
    this.newUser$.next(newValue)
    this.toggleFormText= newValue? "I already have an account":"I don't have an account";
    }
  
  submitAuthForm() {this.sendLoggingCredentials(this.authService.login(this.authForm.value));}

  submitNewUserForm() {this.sendLoggingCredentials(this.authService.createNewUser(this.newUserForm.value));}

  private sendLoggingCredentials (postResponse: Observable<LoginResponse>):void{
    postResponse.subscribe({
      next:
        (response)=>{
         // localStorage.setItem('token',response.token);
    
        this.route.navigate(['studio/profile', response.id]);
        },
      error: (err)=>{
          this.authErrorMessage="Login/register operation failed"
        }
    }
      
    
      
    );
    }
    

}
