export type Ee = {
  id?: number

  e: string
}

export type User = {
  id?: number

  username: string

  passwordHash: string
}

export type EeError = any

export type UserError = any

export type LoginValues = {
  username: string
  password: string
}

export type RegisterValues = {
  username: string
  email: string
  password: string
  passwordConfirm: string
}
