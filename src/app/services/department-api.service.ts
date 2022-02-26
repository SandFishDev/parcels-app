import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Department} from "../models/department.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartmentApiService {

  DEPARTMENT_ENDPOINT: String = "/api/departments"

  constructor(private http: HttpClient) {
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.DEPARTMENT_ENDPOINT}`).pipe(
      map(departments => {
          return departments.map(department => {
            return {
              ...department,
              successorsActual: department.successors.map(successor => departments.find(value => value.id === successor)!!)
            }
          })
        }
      )
    )
  }

  getDepartment(id: Number) {
    return this.http.get(`${this.DEPARTMENT_ENDPOINT}/${id}`)
  }

  createDepartment(department: Partial<Department>): Observable<void> {
    return this.http.post<void>(`${this.DEPARTMENT_ENDPOINT}`, department)
  }

  updateRulesAndPriority(id: Number, department: Partial<Department>) : Observable<void> {
    return this.http.put<void>(`${this.DEPARTMENT_ENDPOINT}/${id}/rules`, department)
  }

  deleteDepartment(id: Number) {
    return this.http.delete(`${this.DEPARTMENT_ENDPOINT}/${id}`)
  }


}
