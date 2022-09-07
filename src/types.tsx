import { ReactElement } from "react"

export type Post = {
  id:number,
  userId:number,
  title:string,
  body:string,
  user:User
} 

export interface UserPost extends Post {
  user:User
} 

export type User = {
  id:number,
  name:string,
  userName:string,
  email:string,
  adress:{
    street:string,
    suite:string,
    city:string,
    zipcode:string,
    geo:{
      lat:string,
      lng:string
    }
  },
  phone:string,
  website:string,
  company:{
    name:string,
    catchPhrase:string,
    bs:string
  }
}

export type Feature = {
  label:string,
  icon:ReactElement,
  link:string
}

export type MenuGroup = {
  title:string,
  features:Feature[]
}