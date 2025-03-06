import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, of, startWith, take, tap } from 'rxjs';


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

  constructor(private formBuilder: FormBuilder){}


  ngOnInit(): void {
    this.initObservables();
    this.initFormControls();
    this.initMainform();
  }

  private initMainform():void{
    this.authForm=this.formBuilder.group({
      email:this.emailCtrl,
      password:this.passwordCtrl
    });
    this.newUserForm=this.formBuilder.group({
      email:this.newEmailCtrl,
      password:this.newPasswordCtrl,
      confirmPassword: this.newConfirmPasswordCtrl
    });
  }

  private initFormControls():void{
    this.emailCtrl=this.formBuilder.control('',Validators.required),
    this.passwordCtrl=this.formBuilder.control('',Validators.required),
    this.newEmailCtrl=this.formBuilder.control('',Validators.required),
    this.newPasswordCtrl=this.formBuilder.control('',Validators.required),
    this.newConfirmPasswordCtrl=this.formBuilder.control('',Validators.required)
  }

  private initObservables():void{
    
  }

  toggleForm() {
    var newValue=!this.newUser$.value;
    this.newUser$.next(newValue)
    this.toggleFormText= newValue? "I already have an account":"I don't have an account";
    }

}
