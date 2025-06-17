import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioActualitiesComponent } from './studio-actualities.component';

describe('StudioActualitiesComponent', () => {
  let component: StudioActualitiesComponent;
  let fixture: ComponentFixture<StudioActualitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioActualitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioActualitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
