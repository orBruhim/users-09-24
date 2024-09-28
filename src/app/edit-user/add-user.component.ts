import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UsersService} from "../shared/users.service";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AddressComponent} from "../address/address.component";

@Component({
    selector: 'app-add-user',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        AddressComponent
    ],
    templateUrl: './add-user.component.html',
    styleUrl: './add-user.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class AddUserComponent implements OnInit, OnDestroy {

    private subscriptions = new Subscription();
    private usersService = inject(UsersService);
    private fb = inject(FormBuilder);

    userForm!: FormGroup;

    ngOnInit(): void {
        this.initializeForm();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onSubmit(): void {
        if (this.userForm.valid) {
            this.usersService.addUser(this.userForm.value).subscribe()
        } else {
            console.log('Form is not valid');
        }
    }

    get addresses(): FormArray {
        return this.userForm.get('addresses') as FormArray;
    }

    createAddressGroup(): FormGroup {
        return this.fb.group({
            addressName: ['', Validators.required],
            street: ['', Validators.required],
            city: ['', Validators.required]
        });
    }

    addAddress() {
        this.addresses.push(this.createAddressGroup());
    }

    removeAddress(index: number) {
        if (this.addresses.length > 1) {
            this.addresses.removeAt(index);
        }
    }

    private initializeForm(): void {
        this.userForm = this.fb.group({
            name: new FormControl('', Validators.required),
            birthdate: new FormControl(''),
            addresses: this.fb.array([this.createAddressGroup()])
        });
    }
}
