import { Component, OnInit,  EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DugnadService, OrgService } from '../../services/services';
import { Dugnad, Organization } from '../../models/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-make-dugnad',
  templateUrl: './make-dugnad.component.html',
  styleUrls: ['./make-dugnad.component.css']
})
export class MakeDugnadComponent implements OnInit {

  data:any;
  events: EventEmitter<{}> = new EventEmitter()

	dugName = "";
	dugDescription = "";
	dugLocation = "";
	dugStartDate = "";
	dugStartTime = "";
	dugEndDate = "";
	dugEndTime = "";
	dugAnt = "";

  org: Organization;
  orgSubscription: Subscription;
  orgInitSubscription : Subscription;

  constructor(private dugnadService : DugnadService,
    private router : Router,
    private orgService: OrgService) { }

  ngOnInit() {
    this.orgInitSubscription = this.orgService.getIsInitObservable().subscribe(bool => {
      if (bool){
        this.orgService.getOrgObservable().then(observable => {
          this.orgSubscription = observable.subscribe(org => {
            this.org = org;
          })
        })
      }
    });
  }

	onSubmit(event){
    let dugnad = new Dugnad(null, this.org.uuid, this.dugName, this.dugDescription,
      this.dugLocation, Dugnad.fromStringToTime(this.dugStartTime, this.dugStartDate),
      Dugnad.fromStringToTime(this.dugEndTime, this.dugEndDate), this.dugAnt, true);

		this.orgService.addDugnad(dugnad).then(() => {
      this.events.emit({type: 'close'})
    })

	}

}
