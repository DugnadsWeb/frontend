export class Organization {

  uuid:string;
  orgName:string;
  email:string;
  phone:string;
  description:string;

  constructor(uuid: string,
              orgName: string,
              email: string,
              phone: string,
              description: string){
    this.uuid = uuid;
    this.orgName = orgName;
    this.email = email;
    this.phone = phone;
    this.description = description;
  }
}
