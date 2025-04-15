import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsPerPageFilterComponent } from './items-per-page-filter.component';

describe('ItemsPerPageFilterComponent', () => {
  let component: ItemsPerPageFilterComponent;
  let fixture: ComponentFixture<ItemsPerPageFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsPerPageFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsPerPageFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
