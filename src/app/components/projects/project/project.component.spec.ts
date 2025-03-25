import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project-services/project.service';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  class MockActivatedRoute{
      snapshot={params:{id:"mocked-id"}};
    }
    class MockProjectService{
      getSingleProjectById(id:""){
        return of([""]);
      }
    }
    
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectComponent],
      providers: [
              {provide:ActivatedRoute, useClass:MockActivatedRoute},
              {provide:ProjectService, useClass:MockProjectService}
            ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
