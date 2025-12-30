import { Component, Input, Output, EventEmitter, input, output } from '@angular/core';

@Component({
  selector: 'app-tables',
  standalone: true,
  templateUrl: './tables.html'
})
export class Tables {
 data = input<any[]>([]); 

  // Output Functions: No decorator needed
  edit = output<any>();
  remove = output<any>();

  // Example helper methods to trigger the outputs
  onEdit(item: any) {
    this.edit.emit(item);
  }

  onRemove(item: any) {
    this.remove.emit(item);
  }
}