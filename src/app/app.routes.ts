import { Routes,RouterModule } from '@angular/router';
import { LandingPageComponent } from './core/landing-page/landing-page/landing-page.component';
import { ProjectService } from './services/project-services/project.service';
import { ProjectComponent } from '../app/components/projects/project/project.component';
import { ProjectResolver } from '../app/components/projects/project-resolvers/project-resolver';
import { StudioAuthPageComponent } from '../app/components/studio/studio-auth-page/studio-auth-page.component';
import { AuthService } from './services/auth-services/auth.service';
import { StudioProfileComponent } from './components/studio/studio-profile/studio-profile.component';
import { StudioProfileService } from './services/studio-profile-services/studio-profile.service';
import { StudioPageComponent } from './components/studio/studio-page/studio-page.component';
import { StudioPageService } from './services/studio-page-service';

export const routes: Routes = [
    {path:'projects',
        loadComponent: ()=>import('../app/components/projects/project-list/project-list.component').then(m=>m.ProjectListComponent),
        providers:[ProjectService,ProjectResolver], resolve:{projects:ProjectResolver}},
    {path:'projects/:id', component: ProjectComponent, providers:[ProjectService]},
    {path:'auth-studio',component: StudioAuthPageComponent, providers:[AuthService]},
    {path:'studio/profile/:id', component: StudioProfileComponent,providers:[StudioProfileService]},
    {path:'studio/page/:id', component: StudioPageComponent,providers:[StudioPageService]},
    {path:"", component:LandingPageComponent}
    
];
