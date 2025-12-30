import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tables',
  standalone: true,
  templateUrl: './tables.html'
})
export class Tables {
  @Input() data: any[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
}
