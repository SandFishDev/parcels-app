import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationApiService} from "../../services/authentication-api.service";
import {ParcelApiService} from "../../services/parcel-api.service";
import {ContainerApiService} from "../../services/container-api.service";
import {ContainerStatistics, ParcelStatistics} from "../../models/dashboard.model";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  roleCheck: { isAdmin: boolean; departments: string[] } = {
    isAdmin: false,
    departments: []
  }

  containerStatistics$: Observable<ContainerStatistics>;
  parcelStatistics$: Observable<ParcelStatistics>;

  constructor(
    private router: Router,
    private authentication: AuthenticationApiService,
    private parcels: ParcelApiService,
    private containers: ContainerApiService
  ) { }

  ngOnInit() {
    let roles = this.authentication.getUserRoles();

    this.roleCheck.isAdmin = roles.includes("ADMIN")
    this.roleCheck.departments = roles.filter(role => role !== "USER" && role !== "ADMIN")

    this.containerStatistics$ = this.containers.getContainerStatistics();
    this.parcelStatistics$ = this.parcels.getParcelStatistics();


  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
