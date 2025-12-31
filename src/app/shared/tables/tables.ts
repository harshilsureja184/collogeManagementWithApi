import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { TeacherData } from '../../interface'; 
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tables.html',
  styleUrls: ['./tables.css']
})
export class Tables {
  // 1. Using Signal Inputs (Read-only)
 @Input() data: Observable<any[]> | null = null; 
  
  @Output() edit = new EventEmitter<any>();
  @Output() remove = new EventEmitter<string>();
}