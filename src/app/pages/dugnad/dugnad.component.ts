import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable, Subscription} from 'rxjs';
import { Dugnad } from '../../models/models';
import { DugnadService, OrgService } from '../../services/services';
import { DugnadInfoComponent } from '../../components/dugnad-info/dugnad-info.component';
import { ActivityListComponent } from '../../components/activity-list/activity-list.component';

@Component({
  selector: 'app-dugnad',
  templateUrl: './dugnad.component.html',
  styleUrls: ['./dugnad.component.css']
})
export class DugnadComponent implements OnInit {

  dugnad: Dugnad;
  dugnadSubscription: Subscription;

  isAdmin: boolean;
  isAdminSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private dugnadService: DugnadService,
    private orgService: OrgService) { }

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

}
