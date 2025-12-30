import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { TeacherService } from '../apis/teacher-service';
import { TeacherData } from '../interface';
import { Forms } from '../shared/forms/forms';
import { Tables } from '../shared/tables/tables';

@Component({
  selector: 'app-teacher',
  imports: [Forms, Tables],
  templateUrl: './teacher.html',
  styleUrl: './teacher.css',
})
export class Teacher {
  private cdr = inject(ChangeDetectorRef);
  private teacherService = inject(TeacherService);

  teachers: TeacherData[] = [];
  editTeacher: TeacherData | null = null;
  id: any;

  ngOnInit() {
    this.loadTeacher();
  }

  // 1. Load Data
  loadTeacher() {
    this.teacherService.getAll().subscribe(res => {
      this.teachers = res;
      this.cdr.detectChanges(); // 🔥 Force UI refresh
    });
  }

  // 2. Add Student (Push directly to list)
  addTeacher(data: any) {
    this.teacherService.add(data).subscribe(res => {
      alert('Student Added Successfully');
      this.teachers.push(res);
      this.cdr.detectChanges();
    });
  }

  // 3. Update Student (Manual index update)
  updateTeacher(data: any) {
    const id = data.id;
    this.teacherService.update(data).subscribe(() => {
      alert('Student Updated Successfully');

      // 🔥 Find index and replace record manually
      const index = this.teachers.findIndex(s => s.id === id);
      if (index !== -1) {
        this.teachers[index] = data;
      }

      this.editTeacher = null;
      this.cdr.detectChanges();
    });
  }

  // 4. Delete Student (Traditional loop and splice)
  deleteTeacher(id: any) {
    if (confirm('Are you sure you want to delete?')) {
      this.teacherService.delete(id).subscribe(() => {
        alert('Student Deleted Successfully');

        // 🔥 Traditional loop to remove item
        for (let i = 0; i < this.teachers.length; i++) {
          if (this.teachers[i].id === id) {
            this.teachers.splice(i, 1); // 🔥 Splice from array
            break;
          }
        }

        this.cdr.detectChanges();
      });
    }
  }

  // 5. Setup for Edit Mode
  edit(data: any) {
    this.editTeacher = { ...data };
  }

}
