import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsersService} from "../shared/users.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent implements ControlValueAccessor, OnInit{
  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);

  countries = this.usersService.countries;
  cities = this.usersService.cities;

  addressForm: FormGroup = this.fb.group({
    addressName: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required]
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
    this.addressForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {}
  //
  // setDisabledState?(isDisabled: boolean): void {
  //   isDisabled ? this.addressForm.disable() : this.addressForm.enable();
  // }

  private initializeCities() :void {
    this.addressForm.get(['country'])?.valueChanges.pipe(
        switchMap((countryId: number) => {
          return this.usersService.getCitiesByCountry(countryId)
    })
    ).subscribe()
  }
}
