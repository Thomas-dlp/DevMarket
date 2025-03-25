import { ComponentFixture, TestBed } from '@angular/core/testing';

import {StudioProfileComponent } from './studio-profile.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { StudioProfileService } from '../../../services/studio-profile-service';

describe('StudioProfileComponent', () => {
  let component: StudioProfileComponent;
  let fixture: ComponentFixture<StudioProfileComponent>;

  class MockActivatedRoute{
    snapshot={params:{id:"mocked-id"}};
  }
  class MockStudioProfileService{
    getStudioProfileById(id:""){
      return of([""]);
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioProfileComponent],
      providers: [
        {provide:ActivatedRoute, useClass:MockActivatedRoute},
        {provide:StudioProfileService, useClass:MockStudioProfileService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
