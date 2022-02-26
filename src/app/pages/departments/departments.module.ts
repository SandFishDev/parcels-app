import { NgModule } from '@angular/core';

import { DepartmentsRoutingModule } from './departments-routing.module';

import { DepartmentsComponent } from './departments.component';
import {NzListModule} from "ng-zorro-antd/list";
import {CommonModule} from "@angular/common";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzFormModule} from "ng-zorro-antd/form";
import {ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {SuccessorModalComponent} from "../../components/modals/successor-modal/successor-modal.component";
import {NzResultModule} from "ng-zorro-antd/result";


@NgModule({
    imports: [DepartmentsRoutingModule, NzListModule, CommonModule, NzIconModule, NzPageHeaderModule, NzButtonModule, NzModalModule, NzFormModule, ReactiveFormsModule, NzInputModule, NzInputNumberModule, NzSelectModule, NzDividerModule, NzResultModule],
    declarations: [DepartmentsComponent, SuccessorModalComponent],
  exports: [DepartmentsComponent]
})
export class DepartmentsModule { }
