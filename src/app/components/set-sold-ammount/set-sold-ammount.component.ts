import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { SalesStat } from '../../services/sales-activity.service';
import { Subscription } from 'rxjs';
import { SalesActivityService, UserService } from '../../services/services';
import { Dialogable } from '../dialog-container/dialog-container.component';

@Component({
  selector: 'app-set-sold-ammount',
  templateUrl: './set-sold-ammount.component.html',
  styleUrls: ['./set-sold-ammount.component.css']
})
export class SetSoldAmmountComponent implements OnInit, OnDestroy, Dialogable {

  events: EventEmitter<any> = new EventEmitter();
  data:any;

  userSales:SalesStat;
  salesStatsSubscription: Subscription;



  constructor(private salesActivityService: SalesActivityService,
    private userService: UserService) { }

  ngOnInit() {
    this.salesActivityService.getSalesStats().then(observable => {
      this.salesStatsSubscription = observable.subscribe(salesStats => {
        salesStats.forEach(val => {
          if (this.userService.getUser().email == val.user.email) {
            this.userSales = val;
            console.log(val);
          }
        })
      })
    })
  }

  ngOnDestroy(){
    if (!!this.salesStatsSubscription){
      this.salesStatsSubscription.unsubscribe();
    }
  }

  registerSale(){
    this.salesActivityService.registerSale(this.userSales.user, this.userSales.sold);
    this.events.emit({type:'close'});
  }

}
