import { NgModule } from '@angular/core';

import { ContainersRoutingModule } from './containers-routing.module';

import { ContainersComponent } from './containers.component';
import {NzListModule} from "ng-zorro-antd/list";
import {CommonModule} from "@angular/common";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";


@NgModule({
  imports: [ContainersRoutingModule, NzListModule, CommonModule, NzIconModule, NzPageHeaderModule],
  declarations: [ContainersComponent],
  exports: [ContainersComponent]
})
export class ContainersModule { }
