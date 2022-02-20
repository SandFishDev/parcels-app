import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Department} from "../models/department.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartmentApiService {

  DEPARTMENT_ENDPOINT: String = "/api/departments"

  constructor(private http: HttpClient) {
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.DEPARTMENT_ENDPOINT}`)
  }
}
