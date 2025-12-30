import { Component, inject, OnInit, signal } from '@angular/core';
import { TeacherService } from '../apis/teacher-service';
import { TeacherData } from '../interface';
import { Forms } from '../shared/forms/forms';
import { Tables } from '../shared/tables/tables';

@Component({
  selector: 'app-teacher',
  standalone: true, // Assuming standalone based on imports array
  imports: [Forms, Tables],
  templateUrl: './teacher.html',
  styleUrl: './teacher.css',
})
export class Teacher implements OnInit {
  private teacherService = inject(TeacherService);

  // Define signals for state management
  teachers = signal<TeacherData[]>([]);
  editTeacher: TeacherData | null = null;
  id: any;

  ngOnInit() {
    this.loadTeacher();
  }

  // 1. Load Data
  loadTeacher() {
    this.teacherService.getAll().subscribe(res => {
      this.teachers.set(res); // Signals handle UI refresh automatically
    });
  }

  // 2. Add Teacher
  addTeacher(data: any) {
    this.teacherService.add(data).subscribe(res => {
      // Use the update method to push new data reactively
      this.teachers.update(list => [...list, res]);
      alert('Teacher Added Successfully');
    });
  }

  // 3. Update Teacher
  updateTeacher(data: any) {
    this.teacherService.update(data).subscribe(() => {
      // Map through the current list to replace the updated item
      this.teachers.update(list => 
        list.map(t => t.id === data.id ? { ...data } : t)
      );
      
      this.editTeacher = null;
      alert('Teacher Updated Successfully');
    });
  }

  // 4. Delete Teacher
  deleteTeacher(id: any) {
    if (confirm('Are you sure you want to delete?')) {
      this.teacherService.delete(id).subscribe(() => {
        // Filter out the deleted item reactively
        this.teachers.update(list => list.filter(t => t.id !== id));
        alert('Teacher Deleted Successfully');
      });
    }
  }

  // 5. Setup for Edit Mode
  edit(data: any) {
    this.editTeacher = { ...data };
  }
}