import { Component, OnInit } from '@angular/core';
import { StudioTemplate } from '../studioTemplate/studioTemplate';


@Component({
  selector: 'app-private-studio',
  imports: [],
  templateUrl: './private-studio.component.html',
  styleUrl: './private-studio.component.scss'
})
export class PrivateStudioComponent implements OnInit{
  studio$!:StudioTemplate;

  constructor(){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
