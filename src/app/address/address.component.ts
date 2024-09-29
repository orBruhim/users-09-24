import {ChangeDetectionStrategy, Component, EventEmitter, inject, OnDestroy, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsersService} from "../shared/users.service";
import {Subscription, switchMap} from "rxjs";

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
export class AddressComponent implements ControlValueAccessor, OnInit, OnDestroy {

    @Output() addressFormSaved= new EventEmitter<void>();

    private fb = inject(FormBuilder);
    private usersService = inject(UsersService);
    private subscriptions= new Subscription();

    countries = this.usersService.countries;
    cities = this.usersService.cities;

    addressForm: FormGroup = this.fb.group({
        addressName: ['', Validators.required],
        street: ['', Validators.required],
        country: [''],
        city: [''],
    });

    ngOnInit(): void {
        this.usersService.getCountries().subscribe(() => {
            this.initializeCities();
        });
    }

    ngOnDestroy() :void {
        this.subscriptions.unsubscribe();
    }

    writeValue(value: any): void {
        if (value) {
            this.addressForm.patchValue(value);
        }
    }

    registerOnChange(fn: any): void {
       const sub= this.addressForm.valueChanges.subscribe(() => {
            fn({
                ...this.addressForm.value,
            });
        });
       this.subscriptions.add(sub);
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
      const sub=  this.addressForm.get(['country'])?.valueChanges.pipe(
            switchMap((countryId: number) => {
                return this.usersService.getCitiesByCountry(countryId)
            })
        ).subscribe()
        this.subscriptions.add(sub);
    }

}
