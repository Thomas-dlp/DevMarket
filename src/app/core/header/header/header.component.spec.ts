import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { ActivatedRoute, provideRouter, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

@Component({
  template: '<p>Default Page</p>'
})
class DummyPageComponent {}


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let location: Location;
  class MockActivatedRoute{

  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        DummyPageComponent
      ],
      providers: [
        {provide:ActivatedRoute, useClass:MockActivatedRoute},
        provideRouter([
          {path:"", component: DummyPageComponent},
          {path:"user-profile", component: DummyPageComponent},
          {path:"projects", component: DummyPageComponent},
          {path:"auth-studio", component: DummyPageComponent},
        ])
      ]
    })
    .compileComponents();

    router= TestBed.inject(Router);
    location=TestBed.inject(Location);
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to landing page on link click', async()=>{

    const debugElement = fixture.debugElement;
    const link = debugElement.query(By.css('a[routerLink=""]'))?.nativeElement;
    
    expect(link).toBeTruthy();
    link.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(location.path()).toBe("");
  })

 

  it('should navigate to projects on link click', async()=>{

    const debugElement = fixture.debugElement;
    const link = debugElement.query(By.css('a[routerLink="projects"]'))?.nativeElement;
    
    expect(link).toBeTruthy();
    link.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(location.path()).toBe("/projects");
  })

  it('should navigate to studio auth on link click', async()=>{

    const debugElement = fixture.debugElement;
    const link = debugElement.query(By.css('a[routerLink="auth-studio"]'))?.nativeElement;
    
    expect(link).toBeTruthy();
    link.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(location.path()).toBe("/auth-studio");
  })

  


});
