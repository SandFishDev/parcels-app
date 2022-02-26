import {Component, OnInit} from '@angular/core';
import {Department} from "../../models/department.model";
import {DepartmentApiService} from "../../services/department-api.service";
import {BehaviorSubject, Observable, switchMapTo, tap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  departments$: Observable<Department[]>;
  trigger$ = new BehaviorSubject(true);

  departmentCreationModalIsVisible = false;
  departmentSuccessorModalIsVisible = false;

  selectedDepartment?: Department;

  newDepartmentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentApiService) {
  }

  ngOnInit() {
    this.departments$ = this.trigger$.pipe(
      switchMapTo(this.departmentService.getDepartments())
    )

    this.newDepartmentForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, []],
    });
  }

  openDepartmentCreationModal = () => this.departmentCreationModalIsVisible = true;
  openDepartmentSuccessorModal = () => this.departmentSuccessorModalIsVisible = true;

  openDepartmentRulesModal(department: Department) {
    this.selectedDepartment = department;
  }

  createDepartment() {
    if (this.newDepartmentForm.valid) {
      let department: Partial<Department> = {
        name: this.newDepartmentForm.value.name,
        priority: 1,
        rules: [],
        successors: []
      }

      this.departmentService.createDepartment(department).pipe(
        tap(() => {
          this.departmentCreationModalIsVisible = false
        })
      ).subscribe(() => {
        this.trigger$.next(true)
      })
    }
  }

  deleteDepartment(id: Number) {
    this.departmentService.deleteDepartment(id).subscribe(() => {
      this.trigger$.next(true)
    })
  }


  updateSuccessors(id: Number) {


  }

  updateRules(department: Department) {
    this.departmentService.updateRulesAndPriority(department.id, department)
      .subscribe(() => {
        this.cancelSelection();
        this.trigger$.next(true)
      })
  }

  cancelSelection() {
    this.selectedDepartment = undefined;
  }
}
