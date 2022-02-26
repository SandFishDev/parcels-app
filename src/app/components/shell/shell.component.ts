import { Component, OnInit } from '@angular/core';
import {Department} from "../../models/department.model";
import {NavigationEnd, Router} from "@angular/router";
import {AuthenticationApiService} from "../../services/authentication-api.service";
import {DepartmentApiService} from "../../services/department-api.service";
import {Title} from "@angular/platform-browser";
import Utils from "../shared/utils";
import {filter} from "rxjs";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  isCollapsed = true;
  roles: string[] = [];

  departments: Department[] = []

  constructor(private router: Router,
              private titleService: Title,
              private authentication: AuthenticationApiService,
              private departmentService: DepartmentApiService) {
  }

  ngOnInit(): void {
    this.router.events.pipe(

    ).subscribe(result => {
      let split = decodeURIComponent(this.router.url).split('/');
      this.titleService.setTitle(
        Utils.capitalize(split[split.length - 1])
      )
    })

    this.authentication.rolesSubject.subscribe(roles => {
      this.roles = roles;

      if (this.roles.length > 0) {
        this.departmentService.getDepartments().subscribe(departments => {
          this.departments = departments.filter(departments => {
            return this.roles.includes(departments.name.toUpperCase())
          })
        })
      }
    })

    this.authentication.checkAuthStatus();
  }

  logOut() {
    this.authentication.logout()
    this.router.navigate(['login']);
  }
}
