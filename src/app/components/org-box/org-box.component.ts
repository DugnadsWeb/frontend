import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Organization} from "../../models/organization";
import {OrgService} from "../../services/org.service";
import {Dugnad} from "../../models/dugnad";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-org-box',
  templateUrl: './org-box.component.html',
  styleUrls: ['./org-box.component.css'],
  providers: [OrgService]
})
export class OrgBoxComponent implements OnInit, OnDestroy {

  @Input()
  uuid:string;
  org: Organization;
  dugnads: Dugnad[];
  dugSubscription: Subscription;
  orgSubscription: Subscription;


  constructor(private orgService: OrgService, private router: Router) { }

  ngOnInit() {
    console.log(this.uuid);

    this.orgService.init(this.uuid).then( () => {
      this.orgService.getOrgObservable().then(
        observ => this.orgSubscription = observ.subscribe(org => {
          this.org = org; console.log(org);}
        ))
      this.orgService.getDugnadsObservable().then(observ => this.dugSubscription = observ.subscribe(dug => {
        this.dugnads = dug;
      }))
    });

  }

  ngOnDestroy(){
    if(this.dugSubscription){

      this.dugSubscription.unsubscribe();
      this.dugSubscription = null;

    }
    if(this.orgSubscription){

      this.orgSubscription.unsubscribe();
      this.orgSubscription = null;

    }

  }

  routeToOrg(clicked){
    this.router.navigate(['org/', clicked]);
  }
}
