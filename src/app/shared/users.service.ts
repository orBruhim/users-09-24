import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {User} from "./users.interface";

@Injectable({providedIn: 'root'})

export class UsersService {
    users = signal<User[]>([]);
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
        debugger
        return this.http.post<User>(`${this.baseUrl}/persons`, user);
    }
}
