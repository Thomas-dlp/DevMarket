import { Component } from '@angular/core';
import{CommonModule} from '@angular/common'

@Component({
  selector: 'app-left-panel',
  imports: [CommonModule],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.scss'
})
export class LeftPanelComponent {
toggleTabMenu: boolean=true;  
ToggleTabMenu() {this.toggleTabMenu=this.toggleTabMenu===true? false:true}



}
