import { Injectable } from '@angular/core';
import { TeacherData } from '../interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../teacher/teacher';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  getTeacherCount(): number | undefined {
    throw new Error('Method not implemented.');
  }

  getStudentCount(): number | undefined {
    throw new Error('Method not implemented.');
  }
  students: TeacherData[] = [];
  private apiUrl = 'http://localhost:3000/teachers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TeacherData[]> {
    return this.http.get<TeacherData[]>(this.apiUrl);
  }

  add(teacher: Teacher): Observable<TeacherData> {
    return this.http.post<TeacherData>(this.apiUrl, teacher);
  }

  update(teacher: Teacher): Observable<TeacherData> {
    return this.http.put<TeacherData>(`${this.apiUrl}/${teacher.id}`, teacher);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
