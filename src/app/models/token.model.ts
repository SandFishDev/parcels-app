export interface JwtToken {
  sub: string,
  roles: string,
  iat : number,
  exp : number
}
