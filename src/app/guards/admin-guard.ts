import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthenticationApiService} from "../services/authentication-api.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(public authService: AuthenticationApiService, public router: Router) {}
  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    }

    this.router.navigate(['dashboard']);
    return false;
  }
}
