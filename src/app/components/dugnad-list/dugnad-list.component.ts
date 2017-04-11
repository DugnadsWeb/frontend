import { Component, OnInit, Input } from '@angular/core';
import { OrgService } from '../../services/services';
import { Dugnad } from '../../models/models';
import { Subscription } from 'rxjs';
import { MakeDugnadComponent } from '../../components/make-dugnad/make-dugnad.component'

@Component({
  selector: 'app-dugnad-list',
  templateUrl: './dugnad-list.component.html',
  styleUrls: ['./dugnad-list.component.css']
})
export class DugnadListComponent implements OnInit {

  makeDugnadComponent = MakeDugnadComponent;

  dugnads: Dugnad[];
  dugnadsSubscription: Subscription;
  isAdmin: boolean;
  isAdminSubscription: Subscription;

  isOrgServiceInitSubscription: Subscription;

  constructor(private orgService: OrgService) { }

  ngOnInit() {
    this.isOrgServiceInitSubscription = this.orgService.getIsInitObservable().subscribe(isInit => {
      if(isInit) {
        this.orgService.getDugnadsObservable().then(observable => {
          this.dugnadsSubscription = observable.subscribe(dugnads => {
            this.dugnads = dugnads;
          })
        })
        this.orgService.isUserAdminObservable().then(observable => {
          this.isAdminSubscription = observable.subscribe(isAdmin => this.isAdmin = isAdmin);
        })
        this.isOrgServiceInitSubscription.unsubscribe();
      }
    })
  }

}
