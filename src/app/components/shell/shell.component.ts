import { Component, OnInit } from '@angular/core';
import {Department} from "../../models/department.model";
import {Router} from "@angular/router";
import {AuthenticationApiService} from "../../services/authentication-api.service";
import {DepartmentApiService} from "../../services/department-api.service";

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
              private authentication: AuthenticationApiService,
              private departmentService: DepartmentApiService) {
  }

  ngOnInit(): void {
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
