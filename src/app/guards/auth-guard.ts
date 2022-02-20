import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthenticationApiService} from "../services/authentication-api.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthenticationApiService, public router: Router) {}
  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
