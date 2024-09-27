import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./users.interface";

@Injectable({providedIn: 'root'})

export class UsersService {
    private http= inject(HttpClient);
    private baseUrl= 'http://localhost:3000/api'

    getUsers() :Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}/persons`);
    }
}
