import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject} from 'rxjs/Rx';
import { AuthService } from './auth.service';
import { OrgService } from './org.service';
import { Organization, User, Application, Dugnad, Activity } from '../models/models';

@Injectable()
export class DugnadService {

  private isInitSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private dugnad: Dugnad;
  private dugnadSubject: BehaviorSubject<Dugnad>;

  private activities: Activity[];
  private activitiesSubject: BehaviorSubject<Activity[]>;

  constructor(private http: Http,
    private authService: AuthService,
    private orgService: OrgService) { }


  init(dugnadId){
    return new Promise((res, rej) => {
      let subscription = this.getDugnadHttp(dugnadId).subscribe(dugnad => {
        this.dugnad = dugnad;
        this.dugnadSubject = new BehaviorSubject(dugnad);
        this.isInitSubject.next(true);

        if (!this.orgService.isInit){
          // TODO remove orgUuid for dugnad and replace with /api/dugnad/org/:dugnad_id
          this.orgService.init(this.dugnad.orgUuid);
        } else {
          this.orgService.subscribeToDugnad(this.dugnadSubject.asObservable());
        }

        subscription.unsubscribe();
        res();
      });
    });
  }

  isInitObservable(){
    return new Promise<Observable<boolean>>((res, rej) => {
      res(this.isInitSubject.asObservable());
    });
  }

  getDugnad(){
    return new Promise<Observable<Dugnad>>((res, rej) => {
      res(this.dugnadSubject.asObservable());
    });
  }

  editDugnad(dugnad: Dugnad){
    return new Promise((res, rej) => {
      this.putDugnad(dugnad).subscribe(() => {
        this.dugnad = dugnad;
        this.dugnadSubject.next(Object.assign(new Dugnad('','','','','','','','','', this.dugnad)));
        res()
      }, err => rej(err));
    })
  }

  getActivities(){
    return new Promise<Observable<Activity[]>>((res, rej) => {
      if (!this.dugnad) {rej({type:"state error", message:"dugnad is not instantiated, call init first."})}
      if (!this.activities){
        let subscription = this.getActivitiesHttp().subscribe(activities => {
          this.activities = activities;
          this.activitiesSubject = new BehaviorSubject(activities);
          subscription.unsubscribe;
          res(this.activitiesSubject.asObservable());
        })
      } else {
        res(this.activitiesSubject.asObservable());
      }
    })
  }

  addActivity(activity:Activity){
    if (!this.activities) {throw {type:"state error", message:"activities is not instantiated, call getActivities first."}}
    let subscription = this.addActivityHttp(activity).subscribe(activity => {
      this.activities.push(activity);
      this.activitiesSubject.next(this.activities);
      subscription.unsubscribe();
    });
  }

  // #############
  // HTTP calls ##
  // #############

  getDugnadHttp(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
		headers.append('authorization', 'Bearer ' + this.authService.getToken());
    return this.http
      .get(
        'http://localhost:8888/api/dugnad/'+id,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
          return new  Dugnad(res.uuid, res.orgUuid, res.title, res.description,
            res.location, res.startTime, res.endTime, res.maxPartisipants, res.status);

      });
  }


	/*
	* Registrer a new dugnad
	*/

	registrerDug(dugnad: Dugnad, orgId){
    delete dugnad.uuid;
		let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    let body = JSON.stringify({dugnad:dugnad, org: {uuid:orgId}});
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

  private putDugnad(dugnad: Dugnad){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    let body = JSON.stringify({ dugnad:dugnad });
    return this.http
    .put(
      'http://localhost:8888/api/dugnad/',
      body,
      { headers }
      )
      .map(res => res.json())
      .map((res) => {
      if (res) {
        console.log("Dugnad updated");
      }
      return res;
      });

  }

  addActivityHttp(activity: Activity){
    delete activity.uuid;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    let body = JSON.stringify({activity:activity,
       dugnad: {uuid:this.dugnad.uuid}});
    return this.http
      .post(
      'http://localhost:8888/api/activity/',
      body,
      { headers }
    )
    .map(res => res.json())
    .map((res) => {
      if (res) {
        console.log("Activity created succesfully");
      }
      return new Activity(res.uuid, res.title, res.startTime, res.endTime,
        res.description, res.maxPartisipants);
      }).catch((error:any) => {
        console.log(error);
        return Observable.throw(new Error(error));
      });
  }

	getDugnadsForOrg(id){
    let dugnads = [];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', 'Bearer ' + this.authService.getToken());
    return this.http
      .get(
        'http://localhost:8888/api/dugnad/organization/'+id,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        for(let i = 0; i < res.length; i++){

          dugnads.push(new  Dugnad(res[i].uuid, id, res[i].title, res[i].description,
            res[i].location, res[i].startTime, res[i].endTime, res[i].maxPartisipants, res[i].status));

        }
        return dugnads;
      });
  }

	getDugnads()
	{
		return this.http
			.get(
				'http://localhost:8888/api/dugnad/all'
			)
			.map(res => res.json())
			.map((res) => {
				if(res)
				{
					console.log("dugnads fetched");
				}
        let ret = []
        for (let i=0;i<res.length;i++){
          let d = res[i];
          ret.push(new  Dugnad(res.uuid, res.orgUuid, res.title, res.description,
            res.location, res.startTime, res.endTime, res.maxPartisipants, res.status));
        }
			})
			.catch((error:any) => {
      		return Observable.throw(new Error(error.status));
      });
	}

  getActivitiesHttp(){
    return this.http
      .get(
        'http://localhost:8888/api/dugnad/activities/' + this.dugnad.uuid
      )
      .map(res => res.json())
      .map((res) => {
        if(res)
        {
          console.log("dugnads fetched");
        }
        let ret = []
        for (let i=0;i<res.length;i++){
          let d = res[i];
          console.log(res);
          ret.push(new Activity(d.uuid, d.title, d.startTime,
            d.endTime, d.description, d.maxPartisipants));
        }
        return ret;
      })
      .catch((error:any) => {
          return Observable.throw(new Error(error.status));
      });
    }
}
