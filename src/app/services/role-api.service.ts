import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Role} from "../models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class RoleApiService {

  private ROLE_ENDPOINT = "api/roles";

  constructor(private http: HttpClient) {
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.ROLE_ENDPOINT}`)
  }


}
