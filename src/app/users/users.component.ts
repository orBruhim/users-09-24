import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {UsersService} from "../shared/users.service";
import { DatePipe, TitleCasePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  standalone: true,
    imports: [
        TitleCasePipe,
        DatePipe,
    ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit{
  private usersService= inject(UsersService);
  private router= inject(Router);
  users= this.usersService.users;

  ngOnInit() :void {
    this.usersService.getUsers().subscribe();
  }


  navigateToAddUser() :void  {
    this.router.navigate(['/users/add'])
  }
}
