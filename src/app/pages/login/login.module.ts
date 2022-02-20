import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './login.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";


@NgModule({
  imports: [LoginRoutingModule, NzLayoutModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzCheckboxModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
