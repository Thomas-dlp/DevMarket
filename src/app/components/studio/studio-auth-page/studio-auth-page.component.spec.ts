import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../../services/auth-services/auth.service';
import { StudioAuthPageComponent } from './studio-auth-page.component';
import { of } from 'rxjs';

describe('StudioAuthPageComponent', () => {
  let component: StudioAuthPageComponent;
  let fixture: ComponentFixture<StudioAuthPageComponent>;

  class MockService {
    
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioAuthPageComponent],
      providers:[{provide:AuthService, useClass:MockService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioAuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
