import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, map, Observable, of, startWith, take, tap } from 'rxjs';
import { AuthService } from '../../../services/auth-services/auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../../templates/login-response.template';
import { LoadingService } from '../../../services/loading-services/loading.service';


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
  private minPasswordLength: number=6;

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

  updateAllForms() {
    this.authForm.updateValueAndValidity();
    this.newUserForm.updateValueAndValidity();
    }

  private initFormControls():void{
    this.emailCtrl=this.formBuilder.control('',[Validators.required,Validators.email]),
    this.passwordCtrl=this.formBuilder.control('',[Validators.required]),
    this.newEmailCtrl=this.formBuilder.control('',[Validators.required,Validators.email]),
    this.newPasswordCtrl=this.formBuilder.control('',[Validators.required,Validators.minLength(this.minPasswordLength)]),
    this.newConfirmPasswordCtrl=this.formBuilder.control('',[Validators.required,Validators.minLength(this.minPasswordLength)])
  }

  // private setLoginValidators(newUser:boolean): void{
  //   if (newUser){
  //     this.emailCtrl.clearValidators();
  //     this.passwordCtrl.clearValidators();
  //   }else{
  //     this.emailCtrl.addValidators([Validators.required,Validators.email]),
  //     this.passwordCtrl.addValidators(Validators.required)
  //   }
  //   this.emailCtrl.updateValueAndValidity();
  //   this.passwordCtrl.updateValueAndValidity();
  // }
  
  // private setNewUserValidators(newUser:boolean): void{
  //   if (newUser){
  //     this.newEmailCtrl.addValidators([Validators.required, Validators.email]),
  //     this.newPasswordCtrl.addValidators(Validators.required)
  //     this.newConfirmPasswordCtrl.addValidators(Validators.required)
  //   }else{
  //     this.newEmailCtrl.clearValidators();
  //     this.newPasswordCtrl.clearValidators();
  //     this.newConfirmPasswordCtrl.clearValidators();
      
  //   }
  //   this.newEmailCtrl.updateValueAndValidity();
  //   this.newPasswordCtrl.updateValueAndValidity();
  //   this.newConfirmPasswordCtrl.updateValueAndValidity();
  // }

  getFormControlErrorText(ctrl:AbstractControl) {
    if(ctrl.invalid && (ctrl.dirty || ctrl.touched)){
      if(ctrl.hasError('required'))return'This field is required';
    else if(ctrl.hasError('email')) return 'Please enter a valid email';
    else if(ctrl.hasError('minlength')) return `This field must be at least ${this.minPasswordLength} characters long`; 
    else return "This field is invalid";
    }else return "";
    
    }

  toggleForm() {
    var newValue=!this.newUser$.value;
    this.newUser$.next(newValue)
    this.toggleFormText= newValue? "I already have an account":"I don't have an account";
    // this.setLoginValidators(newValue);
    // this.setNewUserValidators(newValue);
    this.authForm.reset();
    this.newUserForm.reset();
    }
  
  submitAuthForm() {
    this.authForm.updateValueAndValidity();
    this.sendLogginCredentials(this.authService.login(this.authForm.value));
  }

  submitNewUserForm() {
    this.newUserForm.updateValueAndValidity();
    this.sendLogginCredentials(this.authService.createNewUser(this.newUserForm.value));
  }

  private sendLogginCredentials (postResponse: Observable<LoginResponse>):void{
    postResponse.subscribe({
      next:
        (response)=>{
         // localStorage.setItem('token',response.token);
    
         this.route.navigate([`studio`, response.id, `profile`]);
        },
      error: (err)=>{
          this.authErrorMessage="Login/register operation failed"
        }
    });
    }
    
    passWordForgottenProcedure() {
      console.log("Method not implemented");
      }

}
