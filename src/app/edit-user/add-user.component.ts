import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UsersService} from "../shared/users.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
    selector: 'app-add-user',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './add-user.component.html',
    styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit, OnDestroy {

    private subscriptions = new Subscription();
    private usersService = inject(UsersService);
    private fb = inject(FormBuilder);

    userForm!: FormGroup;

    ngOnInit(): void {
        this.initializeForm();
    }

    onSubmit(): void {
        if (this.userForm.valid) {
            this.usersService.addUser(this.userForm.value).subscribe()
        } else {
            console.log('Form is not valid');
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private initializeForm(): void {
        this.userForm = this.fb.group({
            name: new FormControl('', Validators.required),
            birthdate: new FormControl('')
        });
    }
}
