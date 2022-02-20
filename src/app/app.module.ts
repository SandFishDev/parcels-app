import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {JwtModule} from "@auth0/angular-jwt";
import {AuthGuard} from "./guards/auth-guard";
import {AdminGuard} from "./guards/admin-guard";
import {ShellComponent} from "./components/shell/shell.component";

registerLocaleData(en);

@NgModule({
  declarations: [
    ShellComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("id_token"),
        allowedDomains: [],
        disallowedRoutes: [],
      }
    }),
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
