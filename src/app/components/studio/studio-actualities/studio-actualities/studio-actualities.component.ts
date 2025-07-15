import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ActualityManager } from '../../../../services/actuality-service/actuality-manager-service/actuality-manager.service';
import { PARENT_ID } from '../../../shared/tokens/tokens';

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
