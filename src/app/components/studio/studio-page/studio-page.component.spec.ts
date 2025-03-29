import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioPageComponent } from './studio-page.component';
import { StudioPageService } from '../../../services/studio-page-services/studio-page.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('StudioPageComponent', () => {
  let component: StudioPageComponent;
  let fixture: ComponentFixture<StudioPageComponent>;

  class MockService{
    getStudioPageById(id:""){
      return of([]);
    }
  }

  class MockActivatedRoute{
    snapshot = { params: { id: 'mocked-id' } }; 
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioPageComponent],
      providers:[{provide:StudioPageService,useClass:MockService},{provide:ActivatedRoute,useClass:MockActivatedRoute}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
