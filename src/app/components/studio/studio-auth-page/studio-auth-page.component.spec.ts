import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../../services/auth-services/auth.service';
import { StudioAuthPageComponent } from './studio-auth-page.component';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormControl, MaxValidator, Validators } from '@angular/forms';

describe('StudioAuthPageComponent', () => {
  let component: StudioAuthPageComponent;
  let fixture: ComponentFixture<StudioAuthPageComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
   authService= jasmine.createSpyObj(AuthService,['login','createNewUser']);
    await TestBed.configureTestingModule({
      imports: [StudioAuthPageComponent],
      providers:[{provide:AuthService, useValue:authService}]
    })
    .compileComponents();

    router=TestBed.inject(Router);
    fixture = TestBed.createComponent(StudioAuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init authForm on init',()=>{
    expect(component.authForm).toBeTruthy();
  });

  it('should init newUser form on init',()=>{
    expect(component.newUserForm).toBeTruthy();
  });

  it('should toggle the form text on click',()=>{
    spyOn(component, 'toggleForm').and.callThrough();
    const initialtext= component.toggleFormText;
    const links = fixture.debugElement.queryAll(By.css('.clickable-link'));
    const link = links.find(link => link.nativeElement.textContent.trim() === component.toggleFormText);
      
    expect(link).toBeTruthy();
    link?.triggerEventHandler('click',null);
    
    fixture.detectChanges();
    fixture.whenStable();
    
    expect(component.toggleForm).toHaveBeenCalled();
    expect(component.toggleFormText).not.toBe(initialtext);

  });

  it('should toggle back to "I don\'t have an account" on click', async () => {
    component.toggleFormText = 'I already have an account';
    component.newUser$.next(true);
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('.clickable-link'));
    const link = links.find(link => link.nativeElement.textContent.trim() === 'I already have an account');

    expect(link).toBeTruthy(); 
  
    link?.triggerEventHandler('click', null);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.toggleFormText).toBe("I don't have an account");
});
  

  it('should validate authForm and call authService.login on button click',()=>{
   
    spyOn(component.authForm, 'updateValueAndValidity').and.callThrough();
    spyOn(component, 'submitAuthForm').and.callThrough();
   
    const button = fixture.debugElement.query(By.css('button'));
      
    expect(button).toBeTruthy();
    button?.triggerEventHandler('click',null);
    
    fixture.detectChanges();
    fixture.whenStable();
    
    expect(component.authForm.updateValueAndValidity).toHaveBeenCalled();
    expect(component.submitAuthForm).toHaveBeenCalled();
    expect(authService.login).toHaveBeenCalled();
  }); 

  

  it('should sumbit newUserForm on button click',async() =>{
    
    const links = fixture.debugElement.queryAll(By.css('.clickable-link'));
    const toggleLink = links.find(link => link.nativeElement.textContent.trim() === component.toggleFormText);
    expect(toggleLink).toBeTruthy();
    toggleLink?.triggerEventHandler('click', null);
    
    fixture.detectChanges();
    await fixture.whenStable(); 
    spyOn(component, 'submitNewUserForm').and.callThrough();
    spyOn(component.newUserForm, 'updateValueAndValidity').and.callThrough();
    const button = fixture.debugElement.query(By.css('button'));
      
    expect(button).toBeTruthy();
    button?.triggerEventHandler('click',null);
    
    fixture.detectChanges();
    fixture.whenStable();
    
    expect(component.newUserForm.updateValueAndValidity).toHaveBeenCalled();
    expect(component.submitNewUserForm).toHaveBeenCalled();
    expect(authService.createNewUser).toHaveBeenCalled();
  });

  it('should update all froms when updateAllForms is called',()=>{
    spyOn(component.authForm,'updateValueAndValidity');
    spyOn(component.newUserForm,'updateValueAndValidity');
   
    component.updateAllForms();

    expect(component.authForm.updateValueAndValidity).toHaveBeenCalled();
    expect(component.newUserForm.updateValueAndValidity).toHaveBeenCalled();
  });

  it('should log in and navigate on successful login', () => {
    spyOn(router,"navigate");
    
    authService.login.and.returnValue(of({ message: 'test-token', id: '123' }));
  
    component.submitAuthForm();
  
    expect(authService.login).toHaveBeenCalledWith(component.authForm.value);
    expect(router.navigate).toHaveBeenCalledWith(['studio/profile', '123']);
  }); //todo implement tokens

  it('should create new user and navigate on success', () => {
    spyOn(router,"navigate");
    
    authService.createNewUser.and.returnValue(of({ message: 'new-token', id: '456' }));
  
    component.submitNewUserForm();
  
    expect(authService.createNewUser).toHaveBeenCalledWith(component.newUserForm.value);
    expect(router.navigate).toHaveBeenCalledWith(['studio/profile', '456']);
  });//todo implement tokens
  

  it('should set authErrorMessage on login failure', () => {
    spyOn(router,"navigate");

    authService.login.and.returnValue(throwError(() => new Error('Login failed')));
  
    component.submitAuthForm();
  
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.authErrorMessage).toBe('Login/register operation failed');
  });
  
  it('should set authErrorMessage on new user registration failure', () => {
    spyOn(router,"navigate");

    authService.createNewUser.and.returnValue(throwError(() => new Error('Registration failed')));
  
    component.submitNewUserForm();
  
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.authErrorMessage).toBe('Login/register operation failed');
  });

  it('should log on passwordForgotten',async ()=>{
    const passwordSpy =spyOn(component,"passWordForgottenProcedure");
    spyOn(console,'log');
    expect(passwordSpy).not.toHaveBeenCalled();

    fixture.detectChanges();

    const links= fixture.debugElement.queryAll(By.css('.clickable-link'));
    const link= links.find(link=>link.nativeElement.textContent.trim()==="I forgot my password");

    link?.triggerEventHandler('click',null);
    fixture.detectChanges();
    await fixture.whenStable();
   
   
    expect(passwordSpy).toHaveBeenCalled();

    passwordSpy.and.callThrough();
    component.passWordForgottenProcedure();
    expect(console.log).toHaveBeenCalledWith("Method not implemented");

  });

  it('should retrun error message on field required',()=>{
    const requiredCtrl= new FormControl('', Validators.required);
    requiredCtrl.markAsDirty();
    const emailCtrl= new FormControl('sd', Validators.email);
    emailCtrl.markAsDirty();
    const minLengthCtrl= new FormControl('123', Validators.minLength(6));
    minLengthCtrl.markAsDirty();
    const otherInvalidCtl= new FormControl(10,Validators.max(1));
    otherInvalidCtl.markAsDirty();

    expect(component.getFormControlErrorText(requiredCtrl)).toBe('This field is required');
    expect(component.getFormControlErrorText(emailCtrl)).toBe('Please enter a valid email');
    expect(component.getFormControlErrorText(minLengthCtrl)).toBe('This field must be at least 6 characters long'); //todo: find a way to acccess the private propertie minPasswordLenght
    expect(component.getFormControlErrorText(otherInvalidCtl)).toBe('This field is invalid');
  });
  it('should not retrun error message on valid control',()=>{
    const validCtrl= new FormControl('');

    expect(component.getFormControlErrorText(validCtrl)).toBe(''); 
  });


});
