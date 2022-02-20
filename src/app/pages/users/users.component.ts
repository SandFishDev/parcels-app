import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UserWithRoles} from "../../models/auth.model";
import {UserApiService} from "../../services/user-api.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$: Observable<UserWithRoles[]>;

  constructor(private userservice: UserApiService) {
  }

  ngOnInit() {
    this.users$ = this.userservice.getUsers()
  }
}
