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
    let sd = this.dugStartDate.split('-');
    let st = this.dugStartTime.split(':');
    let ed = this.dugEndDate.split('-');
    let et = this.dugEndTime.split(':');
    let dugnad = new Dugnad(null, this.org.uuid, this.dugName, this.dugDescription,
      this.dugLocation, new Date(+sd[0], +sd[1], +sd[2], +st[0], +st[1]).getTime(),
      new Date(+ed[0], +ed[1], +ed[2], +et[0], +et[1]).getTime(),
      this.dugAnt, true);


		this.orgService.addDugnad(dugnad).then(() => {
      this.events.emit({type: 'close'})
    })

	}
}
