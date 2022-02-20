import { NgModule } from '@angular/core';

import { DepartmentsRoutingModule } from './departments-routing.module';

import { DepartmentsComponent } from './departments.component';
import {NzListModule} from "ng-zorro-antd/list";
import {CommonModule} from "@angular/common";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";


@NgModule({
  imports: [DepartmentsRoutingModule, NzListModule, CommonModule, NzIconModule, NzPageHeaderModule],
  declarations: [DepartmentsComponent],
  exports: [DepartmentsComponent]
})
export class DepartmentsModule { }
