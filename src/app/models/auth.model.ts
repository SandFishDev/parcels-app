export interface Token {
  token: string
}

export interface Role {
  id: Number,
  name: string,
  description: string,
}

export interface User {
  username: string,
  password?: string
}

export interface UserWithRoles {
  username: string,
  roles: Role[]
}
