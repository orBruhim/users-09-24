import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: 'users',
        loadChildren: () =>
            import('./users/users.module').then(({UsersModule}) => UsersModule)
    },
    {
        path: 'users/add',
        loadChildren: () =>
            import('./edit-user/add-user.module').then(({AddUserModule}) => AddUserModule),
    },
    {path: '**', redirectTo: '/users', pathMatch: 'full'},
];
