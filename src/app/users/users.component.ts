import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {UsersService} from "./users.service";
import {AsyncPipe, DatePipe, TitleCasePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    TitleCasePipe,
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  private usersService= inject(UsersService);
  private router= inject(Router);
  users$= this.usersService.getUsers();


  navigateToAddUser(id: number) :void  {
    this.router.navigate(['/users', id])
  }
}
