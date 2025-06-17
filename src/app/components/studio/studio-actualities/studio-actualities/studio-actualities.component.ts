import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ActualityManager } from '../../../../services/actuality-service/actuality-manager-service/actuality-manager.service';
import { CachedResource } from '../../../../services/cache-services/cached-resource.service';
import { DisplayableElement } from '../../../../templates/displayable-element.template';
import { ActualityService } from '../../../../services/actuality-service/actuality.service';
import { PARENT_ID } from '../../../shared/tokens/tokens';
import { StudioPageComponent } from '../../studio-page/studio-page.component';
import { StudioProfileComponent } from '../../studio-profile/studio-profile.component';

@Component({
  standalone: true,
  selector: 'app-studio-actualities',
  imports: [RouterModule],
  templateUrl: './studio-actualities.component.html',
  styleUrl: './studio-actualities.component.scss',
  providers: [
    {
      provide: PARENT_ID,
      useFactory: ()=> {
        const route = inject(ActivatedRoute);
        return route.snapshot.paramMap.get('id')!;
      }
    },
    {
      provide: ActualityManager,
      useFactory: () => {
        const parentId= inject(PARENT_ID);
        return new ActualityManager(parentId);
      }
    }
  ]
})
export class StudioActualitiesComponent {}
