import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AddUserComponent} from "./add-user.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AddressComponent} from "../address/address.component";

const routes: Routes = [
  { path: '', component: AddUserComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [AddUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AddressComponent,
  ]
})

export class AddUserModule { }
