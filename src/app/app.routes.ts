import { Routes,RouterModule } from '@angular/router';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { LandingPageComponent } from './core/landing-page/landing-page/landing-page.component';
import { ProjectService } from './projects/project-services/project.service';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectComponent } from './projects/project/project.component';

export const routes: Routes = [
    {path:'projects',
        loadComponent: ()=>import('./projects/project-list/project-list.component').then(m=>m.ProjectListComponent),
        providers:[ProjectService]},
    {path:'projects/:id', component: ProjectComponent, providers:[ProjectService]},
    {path:'user-profile', component: UserProfileComponent},
    {path:"", component:LandingPageComponent}
    
];
