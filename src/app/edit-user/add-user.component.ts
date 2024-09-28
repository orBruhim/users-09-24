import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UsersService} from "../shared/users.service";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AddressComponent} from "../address/address.component";
import {Router} from "@angular/router";

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

    userForm!: FormGroup;
    cityForm!: FormGroup;
    isAddressFormValid= false;

    private subscriptions = new Subscription();

    private fb = inject(FormBuilder);
    private router = inject(Router);
    private usersService = inject(UsersService);

    countries = this.usersService.countries;

    ngOnInit(): void {
        this.initializeForm();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onSubmit(): void {
        if (this.userForm.valid && this.addresses.length>=1 && this.isAddressFormValid) {
            this.usersService.addUser(this.userForm.value).subscribe()
            this.router.navigate(['/users'])
        } else {
            console.log('Form is not valid');
        }
    }

    get addresses(): FormArray {
        return this.userForm.get('addresses') as FormArray;
    }

    createAddressGroup(): FormGroup {
        return this.fb.group({
            addressName: [''],
            street: [''],
            country: [''],
            city: this.fb.array([])
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
    onAddressFormSaved() :void {
        this.isAddressFormValid= true;
    }

    submitCityForm() :void {
        if(this.cityForm.valid) {
            this.usersService.addCity(this.cityForm.value).subscribe()
        }
    }

    private initializeForm(): void {
        this.userForm = this.fb.group({
            name: new FormControl('', Validators.required),
            birthdate: new FormControl(''),
            addresses: this.fb.array([this.createAddressGroup()])
        });
        this.cityForm= this.fb.group({
            name: new FormControl('', Validators.required),
            countryId: new FormControl('', Validators.required)
        })
    }

}
