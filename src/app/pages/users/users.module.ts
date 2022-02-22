import {NgModule} from '@angular/core';

import {UsersRoutingModule} from './users-routing.module';

import {UsersComponent} from './users.component';
import {NzListModule} from "ng-zorro-antd/list";
import {CommonModule} from "@angular/common";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";
import {ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzTransferModule} from "ng-zorro-antd/transfer";


@NgModule({
    imports: [UsersRoutingModule, NzListModule, CommonModule, NzIconModule, NzPageHeaderModule, NzTagModule, NzButtonModule, NzModalModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzTransferModule],
  declarations: [UsersComponent],
  exports: [UsersComponent]
})
export class UsersModule {
}
