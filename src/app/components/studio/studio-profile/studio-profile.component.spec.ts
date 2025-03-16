import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateStudioComponent } from './studio-profile.component';

describe('PrivateStudioComponent', () => {
  let component: PrivateStudioComponent;
  let fixture: ComponentFixture<PrivateStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateStudioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
