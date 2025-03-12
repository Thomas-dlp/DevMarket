import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioAuthPageComponent } from './studio-auth-page.component';

describe('StudioAuthPageComponent', () => {
  let component: StudioAuthPageComponent;
  let fixture: ComponentFixture<StudioAuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioAuthPageComponent]
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
