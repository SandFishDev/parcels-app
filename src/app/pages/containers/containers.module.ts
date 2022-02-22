import { NgModule } from '@angular/core';

import { ContainersRoutingModule } from './containers-routing.module';

import { ContainersComponent } from './containers.component';
import {NzListModule} from "ng-zorro-antd/list";
import {CommonModule} from "@angular/common";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzResultModule} from "ng-zorro-antd/result";


@NgModule({
    imports: [ContainersRoutingModule, NzListModule, CommonModule, NzIconModule, NzPageHeaderModule, NzButtonModule, NzUploadModule, NzResultModule],
  declarations: [ContainersComponent],
  exports: [ContainersComponent]
})
export class ContainersModule { }
