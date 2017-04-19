import { Component, OnInit } from '@angular/core';
import { OrgService } from '../../services/services';
import { Subscription } from 'rxjs';
import { Dugnad } from '../../models/models';


@Component({
  selector: 'org-stats',
  templateUrl: './org-stats.component.html',
  styleUrls: ['./org-stats.component.css']
})
export class OrgStatsComponent implements OnInit {

  orgServiceInitSubscription: Subscription;

  dugnads: [{year:number, dugnads:Dugnad[]}];
  dugnadSubscription: Subscription;

  selectedYear:number;


  constructor(private orgService: OrgService) { }

  ngOnInit() {
    this.orgService.isInitObservable().then(observable => {
      this.orgServiceInitSubscription = observable.subscribe(isInit => {
        if(isInit){
          this.orgService.getDugnadsObservable().then(observable => {
            this.dugnadSubscription = observable.subscribe(dugnads => {
              this.dugnads = this.mapDugnadToYear(dugnads);
              if(this.dugnads.length > 0){
              this.selectedYear = this.dugnads[0].year;
            }
            })
          })
          this.orgServiceInitSubscription.unsubscribe();
        }
      })
    })

  }

  // returns [{year: int, dugnads:[dugnads in year]}]
  mapDugnadToYear(dugnads){
    return dugnads.reduce((acc, dugnad) => {
      let date = new Date(+dugnad.startTime);
      let index = -1;
      console.log(acc);
      for(let i=0;i<acc.length;i++){
        if (acc[i].year == date.getFullYear()){
          index = i;
          break;
        }
      }
      if(index == -1) {acc.push({year: date.getFullYear(), dugnads:[dugnad]})}
      else{acc[index].dugnads.push(dugnad)}
      return acc;
    }, [])
  }

  yearChange(event){
    this.selectedYear = this.dugnads[event.target.selectedIndex].year;
  }

}
