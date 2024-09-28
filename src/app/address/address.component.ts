import {ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsersService} from "../shared/users.service";
import {switchMap} from "rxjs";

@Component({
    selector: 'app-address',
    standalone: true,
    imports: [
        ReactiveFormsModule,
    ],
    templateUrl: './address.component.html',
    styleUrl: './address.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent implements ControlValueAccessor, OnInit {

    @Output() addressFormSaved= new EventEmitter<void>();
    private fb = inject(FormBuilder);
    private usersService = inject(UsersService);

    countries = this.usersService.countries;
    cities = this.usersService.cities;

    addressForm: FormGroup = this.fb.group({
        addressName: ['', Validators.required],
        street: ['', Validators.required],
        country: [''],
        city: [''],
    });

    ngOnInit(): void {
        this.usersService.getCountries().subscribe();
        this.initializeCities();
    }

    writeValue(value: any): void {
        if (value) {
            this.addressForm.patchValue(value);
        }
    }

    registerOnChange(fn: any): void {
        this.addressForm.valueChanges.subscribe(() => {
            fn({
                ...this.addressForm.value,
            });
        });
    }


    registerOnTouched(fn: any): void {
    }

    onSubmit() {
        if (this.addressForm.valid) {
            this.addressFormSaved.emit();
        } else {
            console.log('Address Form is not valid');
        }
    }


    private initializeCities(): void {
        this.addressForm.get(['country'])?.valueChanges.pipe(
            switchMap((countryId: number) => {
                return this.usersService.getCitiesByCountry(countryId)
            })
        ).subscribe()
    }
}
