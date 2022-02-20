import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Department} from "../models/department.model";
import {Observable} from "rxjs";
import {Parcel} from "../models/container.model";
import {ParcelStatistics} from "../models/dashboard.model";

@Injectable({
  providedIn: 'root'
})
export class ParcelApiService {

  PARCEL_ENDPOINT = "/api/parcels"

  constructor(private http: HttpClient) {
  }

  getParcelsByDepartment(department: Partial<Department>): Observable<Parcel[]> {
    let params = new HttpParams().set('departmentType', department.name || "");
    return this.http.get<Parcel[]>(`${this.PARCEL_ENDPOINT}`, {params})
  }

  getParcelbyId(id: Number): Observable<Parcel> {
    return this.http.get<Parcel>(`${this.PARCEL_ENDPOINT}/${id}`);
  }

  processParcel(id: Number): Observable<Parcel> {
    return this.http.post<Parcel>(`${this.PARCEL_ENDPOINT}/${id}/command/process`, {});
  }

  getParcelStatistics(): Observable<ParcelStatistics>{
    return this.http.get<ParcelStatistics>(`${this.PARCEL_ENDPOINT}/statistics`);
  }
}
