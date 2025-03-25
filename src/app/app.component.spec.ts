import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { LandingPageComponent } from './core/landing-page/landing-page/landing-page.component';

describe('AppComponent', () => {
  let compiled: HTMLElement;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent,LandingPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
    ]}).compileComponents();

    fixture= TestBed.createComponent(AppComponent);
    fixture.detectChanges;
    compiled=fixture.nativeElement;
  });

  it('should create the app', () => expect(fixture.componentInstance).toBeTruthy());

  it(`should have the 'DevMarket' title`, () => expect(fixture.componentInstance.title).toEqual('DevMarket'));

  it('should render the router', () => expect(compiled.querySelector(`router-outlet`)).toBeTruthy());
  
});
