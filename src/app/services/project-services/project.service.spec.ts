import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Project } from '../../templates/project.template';

describe('ProjectService', () => {
  let service: ProjectService;
  let http:jasmine.SpyObj<HttpClient>;
  const project:Project={
    title: "",
    id: 1,
    studioId: "",
    studioName: "",
    imageUrl: "",
    description: "",
    currentFunding: 0,
    goalFunding: 0,
  }
  
  

  beforeEach(() => {
    http=jasmine.createSpyObj(HttpClient,['get']);
    TestBed.configureTestingModule({
      imports:[],
      providers:[
        {provide:HttpClient,useValue:http},
        ProjectService
      ]
    });
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the correct url when getProject is called', () => {
   http.get.and.returnValue(of([project]));
    service.getProjects();
    expect(http.get).toHaveBeenCalledWith("http://localhost:8080/getProjects.php");
  });

  it('should return the correct project when getSingleProjectById is called ', () => {
   let result:Project|undefined;
   http.get.and.returnValue(of([project]));


    service.getSingleProjectById(1).subscribe(project=>{
      result=project;

  });
    expect(result).toEqual(project);
  });

  it('should handle error when no single project is found', () => {
    http.get.and.returnValue(of([]));
  

    service.getSingleProjectById(1).subscribe({
      next: () => fail('Expected error to be thrown, but got a value'),
      error: (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Project not found');
      }
    });
  
  });
 
});
