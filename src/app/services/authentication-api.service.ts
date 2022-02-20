import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, shareReplay, Subject, tap} from "rxjs";
import {Token} from "../models/auth.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import {JwtToken} from "../models/token.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService {
  private AUTH_ENDPOINT = "/api/users/login"

  rolesSubject: Subject<string[]> = new Subject<string[]>();

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService
              ) {
  }

  public login(username: string, password: string): Observable<Token> {
    localStorage.removeItem('id_token')
    return this.http.post<Token>(`${this.AUTH_ENDPOINT}`, {
      username: username,
      password: password
    }).pipe(
      shareReplay(),
      tap((token: Token) => {
        this.storeToken(token)
        this.rolesSubject.next(this.getUserRoles())
      })
    )
  }

  public logout(){
    localStorage.removeItem('id_token')
    this.rolesSubject.next([])
  }

  storeToken(token: Token){
    localStorage.setItem('id_token', token.token);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('id_token');
    if(token){
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  getDecodedJwtToken(): JwtToken {
    return this.jwtHelper.decodeToken<JwtToken>(
      localStorage.getItem('id_token') || ""
    )
  }

  getUserRoles(): string[] {
    return this.getDecodedJwtToken().roles
      .split(",")
      .map(role => role.slice(5))
  }

  checkAuthStatus() {
    if(this.isAuthenticated()){
      this.rolesSubject.next(this.getUserRoles())
    }else {
      this.rolesSubject.next([]);
    }
  }

  isAdmin(): boolean {
    return this.getUserRoles().includes("ADMIN")
  }
}
