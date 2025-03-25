import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevListComponent } from './dev-list.component';
import { DevServices } from '../../../services/dev-services';
import { of } from 'rxjs';

describe('DevListComponent', () => {
  let component: DevListComponent;
  let fixture: ComponentFixture<DevListComponent>;
  class MockDevService{
    getDevsbyStudio(id:""){
      return of([""]);
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevListComponent],
      providers:[{provide:DevServices,useClass:MockDevService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
