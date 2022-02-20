import { Component, OnInit } from '@angular/core';
import {Department} from "../../models/department.model";
import {DepartmentApiService} from "../../services/department-api.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  departments$: Observable<Department[]>;

  constructor(private departmentService: DepartmentApiService) { }

  ngOnInit() {
    this.departments$ = this.departmentService.getDepartments()
  }
}
