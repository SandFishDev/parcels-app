import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, switchMapTo} from "rxjs";
import {Role, User, UserWithRoles} from "../../models/auth.model";
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

  trigger$ = new BehaviorSubject(true);
  users$: Observable<UserWithRoles[]>;

  roleToUserModalIsVisible = false;
  changeUserRolesForm: FormGroup;

  userCreationModalIsVisible = false;
  newUserForm: FormGroup;

  roles: Role[] = [];
  list: TransferItem[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserApiService,
    private roleService: RoleApiService,
  ) {
  }

  ngOnInit() {

    this.users$ = this.trigger$.pipe(
      switchMapTo(this.userService.getUsers())
    )

    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
      this.list = roles.map(role => {
        return {
          title: role.name,
        } as TransferItem
      })
    })

    this.changeUserRolesForm = this.formBuilder.group({
      id: [null, [Validators.required]],
      username: [null,  [Validators.required]],
      roles: [[]], //Not required since empty list is allowed
    });

    this.newUserForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  openRuleModal(user: UserWithRoles) {
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
    if (this.changeUserRolesForm.valid) {
        this.userService.updateUser(
          this.changeUserRolesForm.controls['id'].value,
          {
            id: this.changeUserRolesForm.controls['id'].value,
            username: this.changeUserRolesForm.controls['username'].value,
            roles: this.changeUserRolesForm.controls['roles'].value
          }
        ).subscribe(
          () => {
            this.trigger$.next(true)
            this.roleToUserModalIsVisible = false;
          }
        )
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

  deleteUser(id: Number) {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.trigger$.next(true)
      }
    )
  }

  openUserCreationModal() {
      this.userCreationModalIsVisible = true;
  }

  createUser() {
    console.log('ehg?')
    if(this.newUserForm.valid){
      let user : User = {
        username: this.newUserForm.get('username')!.value,
        password: this.newUserForm.get('password')!.value
      }

      this.userService.createUser(user).subscribe(
        () => {
          console.log('closing modal')
          this.userCreationModalIsVisible = false;
          this.trigger$.next(true)
        }
      )
    }else {
      console.log('invalid')
    }
  }
}
