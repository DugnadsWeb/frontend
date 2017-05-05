import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable, Subscription} from 'rxjs';
import { Dugnad } from '../../models/models';
import { DugnadService, OrgService } from '../../services/services';
import { DugnadInfoComponent } from '../../components/dugnad-info/dugnad-info.component';
import { ActivityListComponent } from '../../components/activity-list/activity-list.component';
import { EditDugnadComponent } from '../../components/edit-dugnad/edit-dugnad.component';

@Component({
  selector: 'app-dugnad',
  templateUrl: './dugnad.component.html',
  styleUrls: ['./dugnad.component.css'],
  providers: [ DugnadService ]
  //encapsulation: ViewEncapsulation.Native
})
export class DugnadComponent implements OnInit, OnDestroy {

  dugnad: Dugnad;
  dugnadSubscription: Subscription;

  isAdmin: boolean;
  isAdminSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private dugnadService: DugnadService,
    private orgService: OrgService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dugnadService.init(params['id']).then(() => {
        this.dugnadService.getDugnad().then(observable => {
          observable.subscribe(dugnad => {
          this.dugnad = dugnad;

          })
        })
        this.orgService.isUserAdminObservable().then(observable => {
          this.isAdminSubscription = observable.subscribe(isAdmin => {
            this.isAdmin = isAdmin;
          })
        })
      })
    })
  }

  ngOnDestroy(){
    if (this.dugnadSubscription){
      this.dugnadSubscription.unsubscribe();
      this.dugnadSubscription = null;
    }
    if (this.isAdminSubscription){
      this.isAdminSubscription.unsubscribe();
      this.isAdminSubscription = null;
    }

  }

  deleteDugnad(uuid){
    this.orgService.removeDugnad(uuid);
    this.router.navigate(['org/' + this.dugnad.orgUuid]);
  }

}
