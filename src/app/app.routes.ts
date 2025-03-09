import { Routes,RouterModule } from '@angular/router';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { LandingPageComponent } from './core/landing-page/landing-page/landing-page.component';
import { ProjectService } from './services/auth-service/project-services/project.service';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectComponent } from './projects/project/project.component';
import { ProjectResolver } from './projects/project-resolvers/project-resolver';
import { StudioAuthPageComponent } from './studio/studio-auth-page/studio-auth-page.component';
import { AuthService } from './services/auth-services/auth.service';

export const routes: Routes = [
    {path:'projects',
        loadComponent: ()=>import('./projects/project-list/project-list.component').then(m=>m.ProjectListComponent),
        providers:[ProjectService,ProjectResolver], resolve:{projects:ProjectResolver}},
    {path:'projects/:id', component: ProjectComponent, providers:[ProjectService]},
    {path:'user-profile', component: UserProfileComponent},
    {path:'auth-studio',component: StudioAuthPageComponent, providers:[AuthService]},
    {path:"", component:LandingPageComponent}
    
];
