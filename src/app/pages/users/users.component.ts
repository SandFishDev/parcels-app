import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Role, UserWithRoles} from "../../models/auth.model";
import {UserApiService} from "../../services/user-api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TransferChange, TransferItem} from "ng-zorro-antd/transfer";
import {RoleApiService} from "../../services/role-api.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$: Observable<UserWithRoles[]>;

  roleToUserModalIsVisible = false;
  changeUserRolesForm: FormGroup;

  roles: Role[] = [];
  list: TransferItem[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserApiService,
    private roleService: RoleApiService,
  ) {
  }

  ngOnInit() {
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
      this.list = roles.map(role => {
        return {
          title: role.name,
        } as TransferItem
      })
    })

    this.users$ = this.userService.getUsers();

    this.changeUserRolesForm = this.formBuilder.group({
      id: [null, [Validators.required]],
      username: [null,  [Validators.required]],
      roles: [[]], //Not required since empty list is allowed
    });
  }

  openDepartmentCreationModal(user: UserWithRoles) {
    this.list = this.list.map(item => {
      return {
        ...item,
        direction: user.roles.map(role => role.name).includes(item.title) ? 'right' : 'left'
      } as TransferItem
    })

    this.roleToUserModalIsVisible = true
    this.changeUserRolesForm.controls['id'].setValue(user.id)
    this.changeUserRolesForm.controls['username'].setValue(user.username)
    this.changeUserRolesForm.controls['roles'].setValue(user.roles)
  }

  addRoleToUser() {
    console.log('check', this.changeUserRolesForm,  this.changeUserRolesForm.controls['roles'].value)
    if (this.changeUserRolesForm.valid) {
        this.userService.updateUser(
          this.changeUserRolesForm.controls['id'].value,
          {
            id: this.changeUserRolesForm.controls['id'].value,
            username: this.changeUserRolesForm.controls['username'].value,
            roles: this.changeUserRolesForm.controls['roles'].value
          }
        ).subscribe()
    }
  }

  change($event: TransferChange) {
    let currentUserRoles = this.changeUserRolesForm.controls['roles'].value as Role[]
    let movedRoles = $event.list.map(i => this.roles.find(role => role.name === i.title)!!);

    //from left to right so adding to user
    if ($event.from === "left") {
      currentUserRoles.push(...movedRoles)
      this.changeUserRolesForm.controls['roles'].setValue(currentUserRoles)
    }

    //from right to left so removing from user
    if ($event.from === "right") {
      let cleanedRules = currentUserRoles.filter(role => !$event.list.map(i => i.title).includes(role.name))
      this.changeUserRolesForm.controls['roles'].setValue(cleanedRules)
    }
  }
}
