import { NgModule } from '@angular/core';

import { ParcelsRoutingModule } from './parcels-routing.module';

import { ParcelsComponent } from './parcels.component';
import {NzListModule} from "ng-zorro-antd/list";
import {CommonModule} from "@angular/common";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";


@NgModule({
    imports: [ParcelsRoutingModule, NzListModule, CommonModule, NzIconModule, NzPageHeaderModule, NzButtonModule, NzPopconfirmModule],
  declarations: [ParcelsComponent],
  exports: [ParcelsComponent]
})
export class ParcelsModule { }
