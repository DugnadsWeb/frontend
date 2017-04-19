import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { OrgService } from '../../services/services';
import { Subscription } from 'rxjs';
import { User } from '../../models/models';

@Component({
  selector: 'member-attendans-overview',
  templateUrl: './member-attendans-overview.component.html',
  styleUrls: ['./member-attendans-overview.component.css']
})


export class MemberAttendansOverviewComponent implements OnInit, OnChanges {

  @Input()
  year: number

  stats: [{user:User, count:number}];
  statsSubscription: Subscription;

  constructor(private orgService: OrgService) { }

  ngOnInit() {
    this.statsSubscription = this.orgService.getAttendantsStatsByYear(this.year).subscribe(stats => {
      this.stats = stats;
    }, err => console.log(err));
  }

  ngOnChanges(){
    this.statsSubscription = this.orgService.getAttendantsStatsByYear(this.year).subscribe(stats => {
      this.stats = stats;
    }, err => console.log(err));
  }

}
