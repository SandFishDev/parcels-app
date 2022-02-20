import {NgModule} from '@angular/core';

import {UsersRoutingModule} from './users-routing.module';

import {UsersComponent} from './users.component';
import {NzListModule} from "ng-zorro-antd/list";
import {CommonModule} from "@angular/common";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzTagModule} from "ng-zorro-antd/tag";


@NgModule({
  imports: [UsersRoutingModule, NzListModule, CommonModule, NzIconModule, NzPageHeaderModule, NzTagModule],
  declarations: [UsersComponent],
  exports: [UsersComponent]
})
export class UsersModule {
}
