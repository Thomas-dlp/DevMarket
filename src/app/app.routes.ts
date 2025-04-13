import { Routes } from '@angular/router';
import { LandingPageComponent } from './core/landing-page/landing-page/landing-page.component';
import { StudioAuthPageComponent } from '../app/components/studio/studio-auth-page/studio-auth-page.component';
import { AuthService } from './services/auth-services/auth.service';
import { StudioProfileComponent } from './components/studio/studio-profile/studio-profile.component';
import { StudioPageComponent } from './components/studio/studio-page/studio-page.component';
import { DevService } from './services/dev-services/dev.service';
import { DevComponent } from './components/devs/dev/dev.component';
import { DevResolver } from './components/devs/dev-resolvers/dev-resolver';
import { StudioProfileGuard } from './core/guards/studio-profile-guard/studio-profile.guard';

export const routes: Routes = [
    {path:'auth-studio',component: StudioAuthPageComponent, providers:[AuthService]},
    {path:'studio/:id/profile', component: StudioProfileComponent, canActivate:[StudioProfileGuard], providers:[DevService]},
    {path:'studio/:id/page', component: StudioPageComponent},
    {path:'devs',
        loadComponent: ()=>import('../app/components/devs/dev-list/dev-list.component').then(m=>m.DevListComponent),
        providers:[DevService,DevResolver], resolve:{devs:DevResolver}},
    {path:'dev/:id', component: DevComponent, providers:[DevService]},
    {path:"", component:LandingPageComponent}
    
];
