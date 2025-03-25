import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { HttpClient } from '@angular/common/http';

describe('ProjectService', () => {
  let service: ProjectService;

  class MockService {
    
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[],
      providers:[{provide:HttpClient,useClass:MockService},ProjectService]
    });
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
