import { Component, Input, input, OnInit } from '@angular/core';
import { Project } from '../project-templates/project-template';

@Component({
  selector: 'app-project-list-item',
  imports: [],
  templateUrl: './project-list-item.component.html',
  styleUrl: './project-list-item.component.scss'
})
export class ProjectListItemComponent implements OnInit {
ngOnInit(): void {
  
}
@Input() project!:Project;
}
