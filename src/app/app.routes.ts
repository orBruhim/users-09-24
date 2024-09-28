import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: 'users',
        loadChildren: () =>
            import('./users/users.module').then(({UsersModule}) => UsersModule)
    },
    {
        path: 'users/:id',
        loadChildren: () =>
            import('./edit-user/edit-user.module').then(({EditUserModule}) => EditUserModule),
    },
    {path: '**', redirectTo: '/users', pathMatch: 'full'},
];
