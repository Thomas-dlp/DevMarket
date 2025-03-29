import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './project-list.component';
import { ProjectListItemComponent } from '../project-list-item/project-list-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/project-services/project.service';
import { of } from 'rxjs';
import { Project } from '../../../templates/project.template';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let router: Router;

  class MockActivatedRoute{
        data=of([""]);
      }
  class MockRouter{
    navigateByUrl(id:""){
      return of([""]);
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListComponent],
      providers: [
                    {provide:ActivatedRoute, useClass:MockActivatedRoute},
                    {provide:Router, useClass:MockRouter}
                  ]
    })
    .compileComponents();

    router= TestBed.inject(Router);
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to component',()=>{
    const project: Project={
      title:"",
      id:10,
      studioId:"",
      studioName:"",
      imageUrl:"",
      description:"",
      currentFunding:1,
      goalFunding:1
    };

     spyOn(router,"navigateByUrl");
    component.RouteToComponent(project);
    fixture.detectChanges();

    expect(router.navigateByUrl).toHaveBeenCalledWith(`projects/10`);
  });
});
