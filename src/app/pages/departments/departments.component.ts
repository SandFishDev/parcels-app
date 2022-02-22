import {Component, OnInit} from '@angular/core';
import {Department} from "../../models/department.model";
import {DepartmentApiService} from "../../services/department-api.service";
import {Observable, tap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  departments$: Observable<Department[]>;
  departmentCreationModalIsVisible = false;

  newDepartmentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentApiService) {
  }

  ngOnInit() {
    this.departments$ = this.departmentService.getDepartments()

    this.newDepartmentForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, []],
    });
  }

  openDepartmentCreationModal() {
    this.departmentCreationModalIsVisible = true
  }

  createDepartment() {
    if (this.newDepartmentForm.valid) {
      let department: Partial<Department> = {
        name: this.newDepartmentForm.value.name,
        successors: []
      }

      this.departmentService.createDepartment(department).pipe(
        tap(() => {
          console.log('department created');
          this.departmentCreationModalIsVisible = false
        })
      ).subscribe()
    }
  }

  deleteDepartment(id: Number) {
    this.departmentService.deleteDepartment(id).pipe(
      tap(() => console.log('department deleted'))
    ).subscribe()
  }


}
