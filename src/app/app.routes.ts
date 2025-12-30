import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'teacher',
    loadComponent: () =>
      import('./teacher/teacher').then(m => m.Teacher)
  },
  {
    path: 'student',
    loadComponent: () =>
      import('./student/student').then(m => m.Student)
  },
//   {
//     path: 'student/:email',
//     loadComponent: () =>
//       import('./student/student').then(m => m.Student)

//   },

//   {
//     path: 'teacher/:email',
//     loadComponent: () =>
//       import('./teacher/teacher').then(m => m.Teacher)

//   },

  { path: '', redirectTo: '/dashboard', pathMatch: "full" }
];
