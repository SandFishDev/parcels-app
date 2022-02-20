import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth-guard";
import {AdminGuard} from "./guards/admin-guard";
import {ShellComponent} from "./components/shell/shell.component";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        canActivate: [AuthGuard],
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        canActivate: [AuthGuard, AdminGuard],
        path: 'containers',
        loadChildren: () => import('./pages/containers/containers.module').then(m => m.ContainersModule)
      },
      {
        canActivate: [AuthGuard],
        path: 'parcels/:type',
        loadChildren: () => import('./pages/parcels/parcels.module').then(m => m.ParcelsModule)
      },
      {
        canActivate: [AuthGuard, AdminGuard],
        path: 'departments',
        loadChildren: () => import('./pages/departments/departments.module').then(m => m.DepartmentsModule)
      },
      {
        canActivate: [AuthGuard, AdminGuard],
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
      },
    ]
  },
  {path: '', pathMatch: 'full', redirectTo: 'app/dashboard'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
