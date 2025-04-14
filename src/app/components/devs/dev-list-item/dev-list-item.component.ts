import { Component, Input } from '@angular/core';
import { Dev } from '../../../templates/dev.template';

@Component({
  selector: 'app-dev-list-item',
  standalone:true,
  imports: [],
  templateUrl: './dev-list-item.component.html',
  styleUrl: './dev-list-item.component.scss'
})
export class DevListItemComponent {
  @Input() dev!:Dev;
}

  

