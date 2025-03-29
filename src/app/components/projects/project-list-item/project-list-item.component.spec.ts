import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListItemComponent } from './project-list-item.component';
import { Project } from '../../../templates/project.template';

describe('ProjectListItemComponent', () => {
  let component: ProjectListItemComponent;
  let fixture: ComponentFixture<ProjectListItemComponent>;
  let mockProject: Project;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListItemComponent],
      
    })
    .compileComponents();
    mockProject = {
      title:"",
      id:1,
      studioId:"",
      studioName:"",
      imageUrl: "",
      description:"",
      currentFunding: 1,
      goalFunding:1
    };
    fixture = TestBed.createComponent(ProjectListItemComponent);
    component = fixture.componentInstance;
    component.project = mockProject;
    fixture.detectChanges();
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });

  it('should display main content when project is provided',()=>{
    const compiled= fixture.nativeElement;
    expect(compiled.querySelector('.project-list')).toBeTruthy();
  })
});
