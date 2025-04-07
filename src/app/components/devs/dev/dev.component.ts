import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Dev } from '../../../templates/dev.template';
import { DevService } from '../../../services/dev-services/dev.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-dev',
  imports: [AsyncPipe,CommonModule],
  templateUrl: './dev.component.html',
  styleUrl: './dev.component.scss'
})
export class DevComponent {
project$!:Observable<Dev>;

  constructor(private devService: DevService, private route: ActivatedRoute){}
  
  ngOnInit(): void {
    const projectId= this.route.snapshot.params['id'];
    this.project$= this.devService.getSingleDevById(projectId);
  }
}
