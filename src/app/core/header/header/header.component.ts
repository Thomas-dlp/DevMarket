import { Component, OnInit } from '@angular/core';
import{ RouterModule} from '@angular/router';
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterModule, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  studioId:string|null=null;
  ngOnInit(): void {
    this.studioId = sessionStorage.getItem('studioId');
  }
  
}
