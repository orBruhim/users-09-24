import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription, switchMap, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../shared/users.service";

@Component({
    selector: 'app-edit-user',
    standalone: true,
    imports: [],
    templateUrl: './edit-user.component.html',
    styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit,OnDestroy {

    private subscriptions = new Subscription();
    private activatedRoute = inject(ActivatedRoute);
    private usersService = inject(UsersService);

    ngOnInit(): void {
        this.initializeForm();
    }

    onSubmit(): void {
        // if (this.contactForm.valid) {
        //   this.editContact ? this.contactsService.updateContact(this.contactForm.value).subscribe(): this.contactsService.addContact(this.contactForm.value).subscribe();
        // } else {
        //   console.log('Form is not valid');
        // }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private initializeForm(): void {
        const sub = this.activatedRoute.params.pipe(
            switchMap(params =>
                this.usersService.getUsers().pipe(
                    tap(() =>  {
                        console.log(this.usersService.getUserById(params['id']))
                    }
                    ))
            )
        ).subscribe();
        this.subscriptions.add(sub);
    }

}
