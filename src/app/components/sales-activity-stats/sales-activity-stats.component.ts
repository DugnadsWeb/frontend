import { Component, OnInit } from '@angular/core';
import { SalesStat } from '../../services/sales-activity.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sales-activity-stats',
  templateUrl: './sales-activity-stats.component.html',
  styleUrls: ['./sales-activity-stats.component.css']
})
export class SalesActivityStatsComponent implements OnInit {

  salesStats:SalesStat[];
  salesStatsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
  }

}
