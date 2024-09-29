import { NgModule } from '@angular/core';
import {CommonModule, DatePipe, TitleCasePipe} from '@angular/common';
import {UsersComponent} from "./users.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', component: UsersComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TitleCasePipe,
    DatePipe,
  ]
})
export class UsersModule { }
