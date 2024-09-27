import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'users',
        loadChildren: () =>
            import('./users/users.module').then(({ UsersModule }) => UsersModule),
    },
    { path: '**', redirectTo: '/users', pathMatch: 'full' },
];
