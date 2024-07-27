import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { CrudComponent } from './private/crud/crud.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { GaleryComponent } from './private/galery/galery.component';
import { ProfileComponent } from './private/profile/profile.component';
import { AboutComponent } from './public/about/about.component';
import { LoginComponent } from './public/login/login.component';

import { authGuard } from './shared/guards/auth.guard';
import { RotateComponent } from './private/rotate/rotate.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [authGuard],
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'galery',
    component: GaleryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'crud',
    component: CrudComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'rotate',
    component: RotateComponent,
    canActivate: [authGuard],
  },
];
