import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioProfileSettingsComponent } from './studio-profile-settings.component';

describe('StudioProfileSettingsComponent', () => {
  let component: StudioProfileSettingsComponent;
  let fixture: ComponentFixture<StudioProfileSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioProfileSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioProfileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
