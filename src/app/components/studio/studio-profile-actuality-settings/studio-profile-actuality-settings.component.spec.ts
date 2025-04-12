import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioProfileActualitySettingsComponent } from './studio-profile-actuality-settings.component';

describe('StudioProfileActualitySettingsComponent', () => {
  let component: StudioProfileActualitySettingsComponent;
  let fixture: ComponentFixture<StudioProfileActualitySettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioProfileActualitySettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioProfileActualitySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
