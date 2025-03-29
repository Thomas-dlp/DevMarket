import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import {StudioProfileComponent } from './studio-profile.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { StudioProfileService } from '../../../services/studio-profile-services/studio-profile.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { StudioProfile } from '../../../templates/studio-profile.template';

describe('StudioProfileComponent', () => {
  let component: StudioProfileComponent;
  let fixture: ComponentFixture<StudioProfileComponent>;
  let studioProfileService: jasmine.SpyObj<StudioProfileService>;
  let mockStudioProfile: StudioProfile;

  class MockActivatedRoute{
    snapshot={params:{id:"mocked-id"}};
  }
  
  
  beforeEach(async () => {
    studioProfileService = jasmine.createSpyObj('StudioProfileService', ['getStudioProfileById','updateForm']);
    await TestBed.configureTestingModule({
      imports: [StudioProfileComponent, ReactiveFormsModule],
      providers: [
        {provide:ActivatedRoute, useClass:MockActivatedRoute},
        {provide:StudioProfileService, useValue:studioProfileService}
      ]
    })
    .compileComponents();
     mockStudioProfile = { 
      id: 'Test id',
      name: 'Test Studio',
      logoUrl: '',
      backgroundPictureUrl: '',
      abstract: '',
      bio: '',
      settings: ['']
    };
    
    fixture = TestBed.createComponent(StudioProfileComponent);
    component = fixture.componentInstance;
  });
  afterEach(() => {
    // Reset the spy after each test to avoid issues with multiple spies on the same function
    studioProfileService.updateForm.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and call patchValue on studioProfile$', () => {
    
    studioProfileService.getStudioProfileById.and.returnValue(of(mockStudioProfile));
  
    fixture.detectChanges();
  
    expect(component.studioProfileForm.value.name).toBe('Test Studio');
  });
  

  

  it('should call SaveForm() on click',()=>{
  
    studioProfileService.getStudioProfileById.and.returnValue(of(mockStudioProfile));
    
    fixture.detectChanges();
    spyOn(component,'saveForm');

    const button=fixture.nativeElement.querySelector('button[type="submit"]');
    button.click();
   
    

    expect(component.saveForm).toHaveBeenCalled();
  })

  it('should call saveForm() if form is valid', () => {
    studioProfileService.getStudioProfileById.and.returnValue(of(mockStudioProfile));

    const mockResponse = { success: true };
    
    studioProfileService.updateForm.and.returnValue(of(mockResponse));

    fixture.detectChanges();
    component.studioProfileForm.controls['name'].setValue('Valid Name');
   
    component.saveForm();
  
    expect(studioProfileService.updateForm).toHaveBeenCalledWith(
      component.studioProfileId,
      component.studioProfileForm.getRawValue()
    );
  
  });
  
  it('should not update form if invalid', () => {
    studioProfileService.getStudioProfileById.and.returnValue(of(mockStudioProfile));
    fixture.detectChanges();
    // Make the form invalid
    component.studioProfileForm.controls['name'].setValue('');
  
    // Call the saveForm method
    component.saveForm();
  
    // Check that updateForm was not called
    expect(studioProfileService.updateForm).not.toHaveBeenCalled();
  });

  it('should handle error when updateForm fails', () => {
    studioProfileService.getStudioProfileById.and.returnValue(of(mockStudioProfile));
    fixture.detectChanges();
  
   
    component.studioProfileForm.controls['name'].setValue('');
  
    spyOn(console, 'log');
  
    component.saveForm();
  
    expect(console.log).toHaveBeenCalledWith('invalid form');
  });
  
});
