export interface IOrderFormRules {
  [key: string]: (name: string) => boolean
  first_name: (name: string) => boolean
  last_name: (name: string) => boolean
  info_1: (name: string) => boolean
  info_2: (name: string) => boolean
  country: (name: string) => boolean
  email: (name: string) => boolean
}
