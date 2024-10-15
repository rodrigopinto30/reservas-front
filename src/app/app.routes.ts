import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./business/dashboard/dashboard.component')
            },
            {
                path: 'user',
                loadChildren: () => import('./business/user/user-routing.module').then(m => m.UserRoutingModule) 
            },
            {
                path: 'profile',
                loadComponent: ()=> import('./business/profile/profile.component')
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: 'login',
        loadComponent: ()=> import('./business/authentication/login/login.component'),
        canActivate: [AuthenticatedGuard]
    },
    {
        path: 'register',
        loadComponent: ()=> import('./business/authentication/register/register.component')
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
