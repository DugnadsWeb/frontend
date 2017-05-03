import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { ActivityService, SalesActivityService} from '../../services/services';
import { SalesStat } from '../../services/sales-activity.service';
import { User } from '../../models/models';
import { Subscription } from 'rxjs';
import { Dialogable } from '../dialog-container/dialog-container.component';

@Component({
  selector: 'app-assign-products',
  templateUrl: './assign-products.component.html',
  styleUrls: ['./assign-products.component.css']
})
export class AssignProductsComponent implements OnInit, Dialogable, OnDestroy {

  events: EventEmitter<any> = new EventEmitter();
  data:any;


  salesStats:SalesStat[];
  salesStatsSubscription: Subscription;

  memberProducts;


  constructor(private activityService:ActivityService,
    private salesActivityService: SalesActivityService) { }

  ngOnInit() {
    this.salesActivityService.getSalesStats().then(observable => {
      this.salesStatsSubscription = observable.subscribe(salesStats => {
        this.salesStats = salesStats;
        this.memberProducts = Object.assign([], salesStats);
      })
    })
  }

  ngOnDestroy(){
    if (this.salesStatsSubscription)this.salesStatsSubscription.unsubscribe();
  }

  giveProduct(){
    this.memberProducts.forEach(val => {
      this.salesActivityService.registerProduct(val[0], val[1]);
    })
    this.events.emit({type: 'close'});
  }

}
