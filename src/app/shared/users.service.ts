import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {City, Country, User} from "./users.interface";

@Injectable({providedIn: 'root'})

export class UsersService {

    users = signal<User[]>([]);
    countries = signal<Country[]>([]);
    cities = signal<City[]>([]);

    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:3000/api'

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}/persons`).pipe(
            tap(users => {
                this.users.set(users)
            })
        );
    }

    addUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}/person`, user);
    }

    getCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(`${this.baseUrl}/countries`).pipe(
            tap(countries => {
                this.countries.set(countries)
            })
        );
    }

    getCitiesByCountry(countryId: number): Observable<City[]> {
        return this.http.get<City[]>(`${this.baseUrl}/cities/${countryId}`).pipe(
            tap(cities => {
                this.cities.set(cities);
            })
        );
    }

    addCity(city: City) :Observable<City> {
        const {name, countryId} = city ;
        const body= {
            name,
            countryId: +countryId,
        }
        return this.http.post<City>(`${this.baseUrl}/city`, body).pipe(
            tap(() => {
                this.getCitiesByCountry(+countryId)
            })
        )
    }
}
