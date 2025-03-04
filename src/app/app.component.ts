import { Component } from '@angular/core';
import { HeaderComponent } from "./core/header/header/header.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { LeftPanelComponent } from "./core/left-panel/left-panel/left-panel.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterModule, LeftPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DevMarket';
}
