import { Component, Input, input, OnInit } from '@angular/core';
import { Project } from '../project-templates/project-template';

@Component({
  selector: 'app-project-item',
  imports: [],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss'
})
export class ProjectItemComponent implements OnInit {
ngOnInit(): void {
  console.log(this.project);
}
@Input() project!:Project;
}
