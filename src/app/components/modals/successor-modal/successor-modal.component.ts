import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DepartmentApiService} from "../../../services/department-api.service";
import {Department} from "../../../models/department.model";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Rule} from "../../../models/rule.model";
import {filter, map, Observable} from "rxjs";


@Component({
  selector: 'app-successor-modal',
  templateUrl: './successor-modal.component.html',
  styleUrls: ['./successor-modal.component.scss']
})
export class SuccessorModalComponent implements OnInit {

  @Input()
  department: Department;

  @Output()
  onSave: EventEmitter<Department> = new EventEmitter<Department>()

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter<void>()


  visible = true;
  departmentForm: FormGroup;

  departments$: Observable<Department[]>

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentApiService
  ) {
  }

  ngOnInit(): void {
    this.departments$ = this.departmentService.getDepartments().pipe(
      map((departments) => departments.filter(department => department.id !== this.department.id))
    )

    this.departmentForm = this.formBuilder.group({
      priority: [this.department.priority, [Validators.required]],
      successors: [this.department.successors],
      rules: this.formBuilder.array(
        this.department.rules.map(rule =>
          this.formBuilder.group({
            key: [rule.key, [Validators.required]],
            sign: [rule.sign, [Validators.required]],
            value: [rule.value, [Validators.required]]
          })
        )
      )
    });
  }

  removeRule(i: number) {
    this.ruleArray.removeAt(i)
  }

  addRule() {
    this.ruleArray.push(
      this.formBuilder.group({
        key: [null, [Validators.required]],
        sign: [null, [Validators.required]],
        value: [null, [Validators.required]]
      })
    )
  }

  save() {
    if(this.departmentForm.invalid){
      console.log("invalid form", this.departmentForm)
      return;
    }

    this.department = {
      ...this.department,
      priority: this.departmentForm.get("priority")!.value,
      successors: this.departmentForm.get("successors")!.value,
      rules: this.departmentForm.get("rules")!.value as Rule[]
    }

    this.onSave.emit(this.department)

    this.visible = false;
  }

  get ruleArray() {
    return this.departmentForm.get("rules") as FormArray
  }

  toGroup(rule: AbstractControl) {
    return rule as FormGroup
  }

  cancel() {
    this.onCancel.emit()
  }
}
