import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject, Subscription, Observer } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Organization, User, Application, Dugnad, Activity } from '../models/models';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class OrgService {

  isInit: boolean = false;
  isInitSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // organization
  private org:Organization;
  private orgSubject: BehaviorSubject<Organization>;
  // the organizations dugnads
  private dugnads: Dugnad[];
  private dugnadsSubject: BehaviorSubject<Dugnad[]>
  private dugnadsSubscriptions: Subscription[] = [];
  // members list
  private members: User[];
  private membersSubject: BehaviorSubject<User[]>
  // admins list
  private admins: User[];
  private adminsSubject: BehaviorSubject<User[]>
  // applicant list
  private applicants:User[];
  private applicantsSubject: BehaviorSubject<User[]>
  // is current user an applicant
  private isUserApplicantSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isUserApplicantSubscription: Subscription;
  // is current user a member
  private isUserMemberSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isUserMemberSubscription: Subscription;
  // is current user a member
  private isUserAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isUserAdminSubscription: Subscription;

  constructor(private http: Http,
              private userService: UserService,
              private authService: AuthService) { }


  init(orgId){
    return new Promise((res, rej) => {
      // TODO ugly fix for http requests, but it works for now
      this.org = new Organization(orgId, '', '', '', '', '');
      this.isInit = true;
      this.getOrgHttp(orgId).subscribe(org => {
        this.org = org;
        this.orgSubject = new BehaviorSubject(org);
        this.isInitSubject.next(true);
        res();
      })
    })
  }

  // #################
  // public methods ##
  // #################

  getOrgObservable(){
    return new Promise<Observable<Organization>>((res, rej) => {
      if (!this.org) {throw ("Organization not instantiated. Call init() first.")}
      res(this.orgSubject.asObservable());
    })
  }

  editOrg(modifiedOrg: Organization){
    return new Promise((res, rej) => {
      this.updateOrg(modifiedOrg).subscribe(ret => {
        this.org = modifiedOrg;
        this.orgSubject.next(Object.assign({}, this.org));
        res();
      }, err => rej(err));
    })
  }

  getDugnadsObservable(){
    return new Promise<Observable<Dugnad[]>>((res, rej) => {
      if (!this.dugnads) {
        this.dugnads = [];
        this.dugnadsSubject = new BehaviorSubject(this.dugnads);
        this.getDugnads().subscribe(dugnads => {
          this.dugnads = dugnads;
          this.dugnadsSubject.next(Object.assign([], this.dugnads));
          res(this.dugnadsSubject.asObservable());
        })
      } else {
        res(this.dugnadsSubject.asObservable());
      }
    })
  }

  addDugnad(dugnad:Dugnad){
    return new Promise((res, rej) => {
      this.registrerDug(dugnad).subscribe(dugnad => {
        this.dugnads.push(dugnad);
        this.dugnadsSubject.next(Object.assign([], this.dugnads));
        res();
      }, err => rej(err));
    });
  }

  subscribeToDugnad(dugnadObservable: Observable<Dugnad>){
    let subscription = dugnadObservable.subscribe(dugnad => {
      for (let i=0;i<this.dugnads.length;i++){
        if (dugnad.uuid == this.dugnads[i].uuid){
          this.dugnads[i] = dugnad;
          this.dugnadsSubject.next(Object.assign([], this.dugnads));
          break;
        }
      }
    },
    err => { console.log(err) },
    () => {
      let index = this.dugnadsSubscriptions.indexOf(subscription);
      this.dugnadsSubscriptions.splice(index, 1);
    });
    this.dugnadsSubscriptions.push(subscription);
  }

  getApplicantsObersvable(){
    return new Promise<Observable<User[]>>((res, rej) => {
      if (!this.org) {rej("Organization not instantiated. Call init() first.")}
      if (!this.applicants){
        this.applicants = [];
        this.applicantsSubject = new BehaviorSubject(this.applicants);
        let subscriprion = this.getApplicants().subscribe(applicants => {
          this.applicants = applicants;
          this.applicantsSubject.next(Object.assign([], this.applicants));
          //subscriprion.unsubscribe();
          console.log('applicants observable was initialized and given');
          res(this.applicantsSubject.asObservable());
        })
      }else{
        console.log('applicants observable was given');
        res(this.applicantsSubject.asObservable());
      }
    });
  }

  addApplication(applicant: User){
    return new Promise((res, rej) => {
      if (!this.applicants) {rej("applicants not instantiated. Call getApplicantsObersvable() first.")}
      this.applicants.forEach(currentApplicant => {
        if (currentApplicant.email == applicant.email){
          rej("User already applied");
        }
      })
      let subscription = this.applyToOrg(applicant).subscribe(() => {
        this.applicants.push(applicant);
        this.applicantsSubject.next(Object.assign([], this.applicants));
        subscription.unsubscribe();
        res();
      }, err => rej(err)); // transmit http request error
    });
  }

  rejectApplication(applicant: User){
    return new Promise((res, rej) => {
      if (!this.applicants) {rej("applicants not instantiated. Call getApplicantsObersvable() first.")}
      let exists = false;
      for (let i=0;i<this.applicants.length;i++){
        if (applicant.email == this.applicants[i].email){
          exists = true;
          let subscription = this.processApplication(applicant, false).subscribe(() => {
            this.applicants.splice(i,1);
            this.applicantsSubject.next(Object.assign([], this.applicants));
            subscription.unsubscribe();
            res();
          },err => rej(err));
          break;
        }
      }
      if (!exists) {rej("User is not an applicant")}
    })
  }

  getMembersObservable(){
    return new Promise<Observable<User[]>>((res, rej) => {
      if (!this.org) {rej("Organization not instantiated. Call init() first.")}
      if (!this.members){
        this.polulateOrganization().then(() => {
          res(this.membersSubject.asObservable())
        });
      }else{
        res(this.membersSubject.asObservable());
      }
    });
  }

  acceptApplication(applicant:User){
    return new Promise((res, rej) => {
      if (!this.applicants) {rej("applicants not instantiated. Call getApplicantsObersvable() first.")}
      if (!this.members) {rej("members not instantiated. Call getMembersObersvable() first.")}
      this.members.forEach(currentMember => {
        if (currentMember.email == applicant.email){
          rej("User already a member");
        }
      });
      let exists = false;
      for (let i=0;i<this.applicants.length;i++){
        if (applicant.email == this.applicants[i].email){
          exists = true;
          let subscription = this.processApplication(applicant, true).subscribe(() => {
            this.applicants.splice(i, 1);
            this.applicantsSubject.next(Object.assign([], this.applicants));
            this.members.push(applicant);
            this.membersSubject.next(Object.assign([], this.members));
            //subscription.unsubscribe();
            res();
          }, err => rej(err))
          break;
        }
      }
      if (!exists) {rej("User is not an applicant")}
    })
  }

  removeMember(member:User){
    return new Promise((res, rej) => {
      if (!this.members) {rej("members not instantiated. Call getMembersObersvable() first.")}
      let exists = false;
      for (let list in {admins:'', members:''}){
        for (let i=0;i<this[list].length;i++){
          if (member.email == this[list][i].email){
            exists = true;
            let subscription = this.removeMemberHttp(member).subscribe(() => {
              this[list].splice(i,1);
              this[list+'Subject'].next(Object.assign([], this[list]));
              //subscription.unsubscribe();
              res();
            }, err => rej(err));
            break;
          }
        }
        if (exists) {break}
      }
      if (!exists) {rej("User is not a member")}
    })
  }

  getAdminsObservable(){
    return new Promise<Observable<User[]>>((res, rej) => {
      if (!this.org) {rej("Organization not initialized. Call init first.")}
      if (!this.admins){
        this.polulateOrganization().then(() => res(this.adminsSubject.asObservable()));
      }else{
        res(this.adminsSubject.asObservable());
      }
    });
  }

  promoteMemberToAdmin(member:User){
    return new Promise((res, rej) =>{
      if (!this.members) {rej("members not instantiated. Call getMembersObersvable() first.")}
      if (!this.admins) {rej("admins not instantiated. Call getAdminsObersvable() first.")}
      this.admins.forEach(currentAdmin => {
        if (member.email == currentAdmin.email){
        rej("User is already an admin");
        return;
      }
      });
      let exists = false;
      for (let i=0;i<this.members.length;i++){
        if (member.email == this.members[i].email){
          exists = true;
          let subscription = this.editAdminRights(member, true).subscribe(() => {
            this.members.splice(i, 1);
            this.membersSubject.next(Object.assign([], this.members));
            this.admins.push(member);
            this.adminsSubject.next(Object.assign([], this.admins));
            //subscription.unsubscribe();
            res();
          }, err => rej(err));
          break;
        }
      }
      if (!exists) {rej("User is not a member")}
    })
  }

  demoteAdminToMember(admin:User){
    return new Promise((res, rej) =>{
      if (!this.members) {rej("members not instantiated. Call getMembersObersvable() first.")}
      if (!this.admins) {rej("admins not instantiated. Call getAdminsObersvable() first.")}
      this.members.forEach(currentAdmin => {
        rej("User is already a member");
      });
      let exists = false;
      for (let i=0;i<this.admins.length;i++){
        if (admin.email == this.admins[i].email){
          exists = true;
          let subscription = this.editAdminRights(admin, false).subscribe(() => {
            this.admins.splice(i, 1);
            this.adminsSubject.next(Object.assign([], this.members));
            this.members.push(admin);
            this.membersSubject.next(Object.assign([], this.members));
            //subscription.unsubscribe();
            res();
          }, err => rej(err));
          break;
        }
      }
      if (!exists) {rej("User is not an admin")}
    })
  }

  isUserAdminObservable(){
    return new Promise<Observable<boolean>>((res, rej) => {
      if (!this.org) {rej("Organization not initialized. Call init first.")}
      if (!this.admins){
        this.polulateOrganization().then(() => {
          this.userStatusSubscriber('isUserAdminSubscription', this.adminsSubject, this.isUserAdminSubject);
        });
      }else if (!this.isUserAdminSubscription){
        this.userStatusSubscriber('isUserAdminSubscription', this.adminsSubject, this.isUserAdminSubject);
      }
      res(this.isUserAdminSubject.asObservable());
    });
  }

  isUserMemberObservable(){
    return new Promise<Observable<boolean>>((res, rej) => {
      if (!this.org) {rej("Organization not initialized. Call init first.")}
      if (!this.members){
        this.polulateOrganization().then(() => {
          this.userStatusSubscriber('isUserMemberSubscription', this.membersSubject, this.isUserMemberSubject);
        });
      }else if (!this.isUserMemberSubscription){
        this.userStatusSubscriber('isUserMemberSubscription', this.membersSubject, this.isUserMemberSubject);
      }
      res(this.isUserMemberSubject.asObservable());
    });
  }

  isUserApplicantObservable(){
    return new Promise<Observable<boolean>>((res, rej) => {
      if (!this.org) {rej("Organization not initialized. Call init first.")}
      if (!this.isUserApplicantSubscription) {
        this.getApplicantsObersvable().then(observable => {
          this.userStatusSubscriber('isUserApplicantSubscription', this.applicantsSubject, this.isUserApplicantSubject);
        });
      }
      res(this.isUserApplicantSubject.asObservable());
    });
  }

  getIsInitObservable(){
    return this.isInitSubject.asObservable();
  }

  // ##################
  // private methods ##
  // ##################

  // gets the organizations members and admins
  private polulateOrganization(){
    this.members = [];
    this.admins = [];
    this.membersSubject = new BehaviorSubject(this.members);
    this.adminsSubject = new BehaviorSubject(this.admins);
    return new Promise((res, rej) => {
      let subscription = this.getMembersHttp().subscribe(members => {
        this.members = members.members;
        this.admins = members.admins;
        this.membersSubject.next(Object.assign([], this.members));
        this.adminsSubject.next(Object.assign([], this.admins));
        //subscription.unsubscribe();
        res();
      })
    })
  }

  // used to make member and admin subscriptions
  private userStatusSubscriber(subscription, subscribeTo, subject){
    this[subscription] = subscribeTo.subscribe(users => {
      let exists = false;
      users.forEach(user => {
        if (user.email == this.userService.getUser().email){
          exists = true;
        }
      });
      subject.next(exists);
    }, err => console.log(err))
  }

  // #############
  // HTTP calls ##
  // #############

	/*
	* Register a new organization.
	*/

	registerOrg(orgNumber, orgName, email, phone, description){
		let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    if(!description)
    {
    	description = "Ingen beskrivelse av organisasjonen";
    }
    let body = JSON.stringify({ orgNumber, orgName, email, phone, description });
    console.log(body);
    return this.http
      .post(
        'http://localhost:8888/api/org/',
        body,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res) {
          console.log("organization created succesfully");
        }
        return res;
      });

	}

	getOrgs()
	{
		return this.http
			.get(
				'http://localhost:8888/api/org/all'
			)
			.map(res => res.json())
			.map((res) => {
				if(res)
				{
					console.log("organizations fetched");
				}
        let ret = [];
        for (let i=0;i<res.length;i++){
          let a = res[i];
          ret.push(a.uuid, a.title, a.startTime, a.endTime,
            a.description, a.maxPartisipants);
        }
				return res;
			})
			.catch((error:any) => {
      		return Observable.throw(new Error(error.status));
      });
	}

  getOrgHttp(uuid: string){
    let headers = new Headers();
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    return this.http.get('http://localhost:8888/api/org/'+uuid, {headers: headers})
    .map(res => res.json())
    .map(res => {
      return new Organization(res.uuid, res.orgName, res.orgNumber, res.email, res.phone, res.description);
    })
    .catch((err:any) => {
      console.log(err);
      return Observable.throw(new Error(err.status));
    })
  }

  // TODO refator getMember and getAdmin and possibly cache
  getMembersHttp(){
    let headers = new Headers();
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    return this.http.get('http://localhost:8888/api/org/members/'+this.org.uuid, {headers: headers})
    .map(res => res.json())
    .map(res => {
      let ret = {members:[], admins:[]};
      for (let type in ret){
        for(let i=0;i<res[type].length;i++) {
          let u = res[type][i];
          ret[type].push(new User(u.email, u.firstName, u.lastName, u.phone));
        }
      }
      return ret;
    })
    .catch((err:any) => {
      console.log(err);
      return Observable.throw(new Error(err.status));
    })
  }

  getAdminsHttp(uuid: string){
    let headers = new Headers();
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    return this.http.get('http://localhost:8888/api/org/members/'+uuid, {headers: headers})
    .map(res => res.json())
    .map(res => {
      let ret = [];
      for(let i=0;i<res.admins.length;i++) {
        let u = res.admins[i];
        ret.push(new User(u.email, u.firstName, u.lastName, u.phone));
      }
      return ret;
    })
    .catch((err:any) => {
      console.log(err);
      return Observable.throw(new Error(err.status));
    })
  }

  private applyToOrg(user:User){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    let body = JSON.stringify({
      user: { email: user.email },
      org: { uuid: this.org.uuid }
      });
    return this.http
      .post(
        'http://localhost:8888/api/org/apply',
        body,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res) {
          console.log("application sent");
        }
        return res;
      })
      .catch(err => {return Observable.throw(err)});
    }

    removeMemberHttp(member){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('authorization', 'Bearer ' + this.authService.getToken());
      let body = JSON.stringify({
        user: { email: member.email },
        org: { uuid: this.org.uuid }
        });
      return this.http
        .post(
          'http://localhost:8888/api/org/rmmember',
          body,
          { headers }
        )
        .map(res => res.json())
        .map((res) => {
          if (res) {
            console.log(res);
          }
          return res;
        });
      }

      getApplicants(){
        let headers = new Headers();
        headers.append('authorization', 'Bearer ' + this.authService.getToken());
        return this.http.get('http://localhost:8888/api/org/applicants/'+this.org.uuid,
        {headers: headers})
        .map(res => res.json())
        .map(res => {
          let ret = [];
          for (let i=0;i<res.length;i++){
            let u = res[i].user;
            ret.push(new User(u.email, u.firstName, u.lastName, u.phone));
            /* TODO may need changing if time of application should be important
            let user = new User(u.email, u.firstName, u.lastName, u.phone);
            ret.push(new Application(user, res[i].applied.applied_date))
            */
          }
          return ret;
        })
        .catch((err:any) => {
          console.log(err);
          return Observable.throw(new Error(err.status));
        })

      }

      private processApplication(user, action){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', 'Bearer ' + this.authService.getToken());
        let body = JSON.stringify({
          user: { email: user.email },
          org: { uuid: this.org.uuid },
          accept: action
          });
        return this.http
          .post(
            'http://localhost:8888/api/org/applicant',
            body,
            { headers }
          )
          .map(res => res.json())
          .map((res) => {
            if (res) {
              console.log(res);
            }
            return res;
          }).catch(err => {console.log(err);return Observable.throw(err)});
      }

      updateOrg(org:Organization){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', 'Bearer ' + this.authService.getToken());
        let body = JSON.stringify({org: org});
        console.log(body);
        return this.http
          .put(
            'http://localhost:8888/api/org/',
            body,
            { headers }
          )
          .map(res => res.json())
          .map((res) => {
            if (res) {
              console.log(res);
            }
            return res;
          });
      }

      editAdminRights(user, action){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', 'Bearer ' + this.authService.getToken());
        let body = JSON.stringify({
          user: { email: user.email },
          org: { uuid: this.org.uuid },
          admin: action
          });
        return this.http
          .post(
            'http://localhost:8888/api/org/chadmin',
            body,
            { headers }
          )
          .map(res => res.json())
          .map((res) => {
            if (res) {
              console.log(res);
            }
            return res;
          });
      }

      getDugnads(){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', 'Bearer ' + this.authService.getToken());
        return this.http
    			.get(
    				'http://localhost:8888/api/org/dugnads/'+this.org.uuid,
            { headers }
    			)
    			.map(res => res.json())
    			.map((res) => {
            let ret = [];
            for (let i=0;i<res.length;i++){
              let d = res[i];
              ret.push(new  Dugnad(d.uuid, d.orgUuid, d.title, d.description,
                d.location, d.startTime, d.endTime, d.maxPartisipants, d.status));
            }
            return ret;
    			})
    			.catch((error:any) => {
          		return Observable.throw(new Error(error.status));
          });
      }

      registrerDug(dugnad: Dugnad){
        delete dugnad.uuid;
    		let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', 'Bearer ' + this.authService.getToken());
        let body = JSON.stringify({dugnad:dugnad, org: {uuid: this.org.uuid}});
      	console.log(body);
      	return this.http
      	  .post(
      		'http://localhost:8888/api/dugnad/',
      		body,
      		{ headers }
      	  )
      	  .map(res => res.json())
      	  .map((res) => {
      		if (res) {
      			console.log("Dugnad created succesfully");
      		}
      		return res;
      	  });

    	}


}
