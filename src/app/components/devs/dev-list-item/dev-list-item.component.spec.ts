import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevListItemComponent } from './dev-list-item.component';

describe('DevListItemComponent', () => {
  let component: DevListItemComponent;
  let fixture: ComponentFixture<DevListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
