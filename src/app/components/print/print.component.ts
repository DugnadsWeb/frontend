import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {PrintService} from "../../services/print.service";
import {DugnadService} from "../../services/dugnad.service";
import {Dugnad} from "../../models/dugnad";
import {Activity} from "../../models/activity";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit, OnDestroy {

  @Input()
  dug:Dugnad;


  activities : any[];
  attendants : any[];
  activitesSubscription: Subscription;


  constructor(private printService: PrintService, private dugnadService: DugnadService)
  {

  }


  ngOnInit() {
    this.attendants = [];

    this.printService.init(this.dug.uuid).then( () => {
      this.printService.getInfo().then(observable => {
        this.activitesSubscription = observable.subscribe(printInfo => {
          this.activities = printInfo;

          /*for(let i = 0; i < this.activities.length; i++){
            for(let j = 0; j < this.activities[i].attends.length; j++){
              this.attendants.push(this.activities[i].attends[j]);
            }
          }*/

        })
      })
    });
  }

  printDiv(){

    /*for(let i = 0; i < this.activities.length; i++){
      for(let j = 0; j < this.activities[i].attends.length; j++){
        this.attendants.push(this.activities[i].attends[j]);
      }
    }*/

    console.log(this.activities);

    console.log(this.attendants);
    window.print();
  }

  ngOnDestroy() {
    if(this.activitesSubscription){
      this.activitesSubscription.unsubscribe();
      this.activitesSubscription = null;
    }
  }

}
