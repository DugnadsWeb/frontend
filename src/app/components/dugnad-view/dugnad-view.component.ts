import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Dugnad } from '../../models/models';
import { OrgService, DugnadService } from '../../services/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dugnad-view',
  templateUrl: './dugnad-view.component.html',
  styleUrls: ['./dugnad-view.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class DugnadViewComponent implements OnInit, OnDestroy {

  @Input()
  dugnad: Dugnad;
  dugnadSubscription: Subscription;

  startTime:any = {};
  endTime:any = {};

  constructor(private router: Router,
    private orgService:OrgService,
    private dugnadService: DugnadService) { }

  ngOnInit() {
    let time = this.dugnad.getTimesAsObeject();
    this.startTime = time[0];
    this.endTime = time[1];

    this.dugnadService.init(this.dugnad.uuid).then(() => {
      this.dugnadService.getDugnad().then(observable => {
        this.dugnadSubscription = observable.subscribe(dugnad => {
          this.dugnad = dugnad;
        })
      })
    })

  }

  ngOnDestroy(){
    this.dugnadSubscription.unsubscribe();
  }

  onClick(event){
    console.log("im clicked");
    this.router.navigate(['dugnad/', this.dugnad.uuid]);
  }

}
