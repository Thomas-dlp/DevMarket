import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project-services/project.service';
import { Project } from '../../../templates/project.template';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let projectService: jasmine.SpyObj<ProjectService>;

  class MockActivatedRoute{
      snapshot={params:{id:"mocked-id"}};
    }
   
    
  beforeEach(async () => {
    projectService = jasmine.createSpyObj('ProjectService', ['getSingleProjectById']);
    await TestBed.configureTestingModule({
      imports: [ProjectComponent],
      providers: [
        {provide:ActivatedRoute, useClass:MockActivatedRoute},
        {provide:ProjectService, useValue:projectService}
      ]      
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display main-content when project$ has data', async () => {
    const mockProject: Project = { 
      title: 'Test Project',
      id: 1, 
      studioId:'1',
      studioName:'', 
      imageUrl: 'https://example.com/image.jpg',
      description: 'Description', 
      currentFunding:0,
      goalFunding:0
    };
    projectService.getSingleProjectById.and.returnValue(of(mockProject)); // Mock API response
    
    fixture.detectChanges();  // Trigger change detection
    await fixture.whenStable(); 
    
    const compiled = fixture.nativeElement;
  
    expect(compiled.querySelector('.main-content')).toBeTruthy(); // Element should exist
  });

  

});
