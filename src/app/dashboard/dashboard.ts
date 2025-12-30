import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudentService } from '../apis/student-service';
import { TeacherService } from '../apis/teacher-service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
   totalStudents: number | undefined;
  totalTeachers: number | undefined;
  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService
  ) { }

  ngOnInit(): void {
    this.totalStudents = this.studentService.getStudentCount();

    this.totalTeachers = this.teacherService.getTeacherCount();

    // OR you can create a getTeacherCount() method similar to Studentservice
  }
}
