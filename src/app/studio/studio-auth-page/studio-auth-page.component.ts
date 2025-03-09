import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, of, startWith, take, tap } from 'rxjs';
import { AuthService } from '../../services/auth-services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-studio-auth-page',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './studio-auth-page.component.html',
  styleUrl: './studio-auth-page.component.scss'
})
export class StudioAuthPageComponent implements OnInit {



  authForm!: FormGroup;
  emailCtrl!: FormControl;
  passwordCtrl!: FormControl;

  newUserForm!: FormGroup;
  newEmailCtrl!:FormControl;
  newPasswordCtrl!:FormControl;
  newConfirmPasswordCtrl!:FormControl;

  newUser$=new BehaviorSubject<boolean>(false);
  toggleFormText= "I don't have an account";

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private route: Router
  ){}


  ngOnInit(): void {
    this.initObservables();
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



  private initObservables():void{
    
  }

  toggleForm() {
    var newValue=!this.newUser$.value;
    this.newUser$.next(newValue)
    this.toggleFormText= newValue? "I already have an account":"I don't have an account";
    }
  
  submitAuthForm() {
    this.authService.login(this.authForm.value);
    // if(this.authService.login(this.authForm.value['email'],this.authForm.value["password"])){
    //   this.authForm.reset();
    //   this.route.navigateByUrl("");
    // }else{
    //   //display error
    //   this.passwordCtrl.reset(); //reset only the password since email adress are rarely wrong.
    // };
    
    }

  submitNewUserForm() {
    //authService.addNewUser(this.newUserForm);
    this.authForm.reset();
    }


}
