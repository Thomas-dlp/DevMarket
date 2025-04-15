import { Component, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-items-per-page-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './items-per-page-filter.component.html',
  styleUrl: './items-per-page-filter.component.scss'
})
export class ItemsPerPageFilterComponent implements OnInit{
  @Output() elementsPerPage:Observable<number>;
  elementsPerPageCtrl!: FormControl;

  
  ngOnInit(): void {
    this.elementsPerPageCtrl= new FormControl(20);
    this.elementsPerPage=this.elementsPerPageCtrl.valueChanges.pipe(
      map(value => Number(value)));
  }
}
