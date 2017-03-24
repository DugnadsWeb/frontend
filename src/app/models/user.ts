export class User {

  firstName:string;
  lastName:string;
  email:string;
  phone:string;

  constructor(email:string,firstName:string, lastName:string,
               phone:string){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }


}
