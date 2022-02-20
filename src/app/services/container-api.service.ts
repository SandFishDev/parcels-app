import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Container, Parcel} from "../models/container.model";
import {HttpClient} from "@angular/common/http";
import {ContainerStatistics, ParcelStatistics} from "../models/dashboard.model";

@Injectable({
  providedIn: 'root'
})
export class ContainerApiService {
  private CONTAINER_ENDPOINT = "api/containers";

  constructor(private http: HttpClient) {
  }

  getContainers(): Observable<Container[]> {
    return this.http.get<Container[]>(`${this.CONTAINER_ENDPOINT}`)
  }

  getContainerStatistics(): Observable<ContainerStatistics>{
    return this.http.get<ContainerStatistics>(`${this.CONTAINER_ENDPOINT}/statistics`);
  }
}
