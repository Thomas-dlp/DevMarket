import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-items-per-page-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './items-per-page-filter.component.html',
  styleUrl: './items-per-page-filter.component.scss'
})
export class ItemsPerPageFilterComponent{
  @Input() itemsPerPageCtrl!:FormControl;
 
}
