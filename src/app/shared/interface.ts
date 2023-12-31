export interface Login {
  email: string,
  password: string
}

export interface Discounts {
  id: string,
  name: string,
  description: string,
  img: string
}

export interface DiscountsRequest {
  name: string,
  description: string,
  img: string
}

export interface Category {
  id: number | string,
  name: string,
  path: string,
  img: string,
}

export interface CategoryRequest {
  name: string,
  path: string,
  img: string
}

export interface Products {
  id: any,
  path: string,
  name: string,
  ingredients: string,
  weight: number,
  price: number,
  img: string,
  category: Category,
  count: number
}

export interface ProductsRequest {
  path: string,
  name: string,
  ingredients: string,
  weight: number,
  price: number,
  img: string
}

export interface User {
  firstName:string,
  lastName:string,
  phoneNumber:string,
  birthday:string,
  email:string,
  id: number | string
}

export interface Order {
  ownerId:string,
  ownerName:string,
  date:string,
  status:boolean,
  price:number,
  items:Array<Products>,
  id:number|string
}