import { Component, OnInit, OnDestroy } from '@angular/core';
import { DugnadService } from '../../services/services';
import { Subscription } from 'rxjs';
import { Dugnad } from '../../models/models';

@Component({
  selector: 'edit-dugnad',
  templateUrl: './edit-dugnad.component.html',
  styleUrls: ['./edit-dugnad.component.css']
})
export class EditDugnadComponent implements OnInit, OnDestroy {

  dugnadServiceInitSubscription: Subscription;
  dugnad: Dugnad;
  dugnadSubscription: Subscription;

  startTime;
  startDate;
  endTime;
  endDate;

  constructor(private dugnadService: DugnadService) { }

  ngOnInit() {
    this.dugnadService.isInitObservable().then(observable => {
      this.dugnadServiceInitSubscription = observable.subscribe(isInit => {
        if (isInit){
          this.dugnadService.getDugnad().then(observable => {
            this.dugnadSubscription = observable.subscribe(dugnad => {
              this.dugnad = dugnad;
              let t = dugnad.getTimeAsHTMLDateFormat();
              this.startTime = t.start.time;
              this.startDate = t.start.date;
              this.endTime = t.end.time;
              this.endDate = t.end.date;
            })
          });
          this.dugnadServiceInitSubscription.unsubscribe();
        }
      });
    });
  }

  ngOnDestroy(){
    if(!!this.dugnadSubscription)this.dugnadSubscription.unsubscribe();
  }

  onSubmit(){
    this.dugnad.setStartTimeFromDateTimeString(this.startTime, this.startDate);
    this.dugnad.setEndTimeFromDateTimeString(this.endTime, this.endDate);
    this.dugnadService.editDugnad(this.dugnad);
  }

}
