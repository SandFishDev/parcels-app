import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import {NzCardModule} from "ng-zorro-antd/card";
import {CommonModule} from "@angular/common";
import {NzListModule} from "ng-zorro-antd/list";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NzResultModule} from "ng-zorro-antd/result";


@NgModule({
    imports: [DashboardRoutingModule, NzCardModule, CommonModule, NzListModule, NzIconModule, NzBadgeModule, NzResultModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule { }
