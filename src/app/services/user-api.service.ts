import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Role, User, UserWithRoles} from "../models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  USERS_ENDPOINT: String = "/api/users"

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<UserWithRoles[]> {
    return this.http.get<UserWithRoles[]>(`${this.USERS_ENDPOINT}`)
  }

  updateUser(id: Number, roles: UserWithRoles){
    return this.http.put<UserWithRoles[]>(`${this.USERS_ENDPOINT}/${id}`, roles)
  }

}
