import { Routes } from '@angular/router';

export const PAGES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component')
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component')
      },
      {
        path: 'progress',
        loadComponent: () => import('./progress/progress.component')
      },
      {
        path: 'graphic1',
        loadComponent: () => import('./graphic1/graphic1.component')
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component')
  }
];
