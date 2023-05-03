export interface IFormError {
  [key: string]: string
  firstName: (name: string) => boolean
  lastName: (name: string) => boolean
  info1: (name: string) => boolean
  info2: (name: string) => boolean
  country: (name: string) => boolean
  email: (name: string) => boolean
}
