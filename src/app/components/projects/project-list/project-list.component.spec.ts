import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './project-list.component';
import { ProjectListItemComponent } from '../project-list-item/project-list-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/project-services/project.service';
import { of } from 'rxjs';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

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

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
