import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../apis/student-service';
import { Forms } from '../shared/forms/forms';
import { Tables } from '../shared/tables/tables';
import { StudentData } from '../interface';
import { Observable, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [Forms, Tables],
  templateUrl: './student.html',
  styleUrls: ['./student.css']
})
export class Student implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private studentService = inject(StudentService);

  students$!: Observable<StudentData[]>; // Observable stream for async pipe
  editStudent: StudentData | null = null;
  id: any;

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.students$ = this.studentService.getAll();
    this.cdr.detectChanges();
  }

  // Use async/await for mutations
  async addStudent(data: StudentData) {
    try {
      await firstValueFrom(this.studentService.add(data));
      alert('Student Added Successfully');
      this.loadStudents(); // refresh the Observable
    } catch (error) {
      console.error('Error adding student:', error);
    }
  }

  async updateStudent(data: StudentData) {
    try {
      await firstValueFrom(this.studentService.update(data));
      alert('Student Updated Successfully');
      this.loadStudents();
      this.editStudent = null;
    } catch (error) {
      console.error('Error updating student:', error);
    }
  }

  async deleteStudent(id: string) {
    try {
      await firstValueFrom(this.studentService.delete(id));
      alert('Student Deleted Successfully');
      this.loadStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  }

  edit(data: StudentData) {
    this.editStudent = { ...data };
  }
}