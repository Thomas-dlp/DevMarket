import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioProfileDevSettingsComponent } from './studio-profile-dev-settings.component';

describe('StudioProfileDevSettingsComponent', () => {
  let component: StudioProfileDevSettingsComponent;
  let fixture: ComponentFixture<StudioProfileDevSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioProfileDevSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioProfileDevSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
