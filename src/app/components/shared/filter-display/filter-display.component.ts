import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-filter-display',
  imports: [NgFor],
  templateUrl: './filter-display.component.html',
  styleUrl: './filter-display.component.scss'
})
export class FilterDisplayComponent {

@Input() filters!: string[];
@Output() filtersChange =new EventEmitter();

  deleteFilter(input:string){
    const currentFilters= this.filters;
    const updatedFilters= currentFilters.filter(filter=>filter!==input)
    this.filtersChange.emit(updatedFilters);
  }
}


