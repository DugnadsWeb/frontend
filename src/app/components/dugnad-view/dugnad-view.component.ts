import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Dugnad } from '../../models/models';

@Component({
  selector: 'dugnad-view',
  templateUrl: './dugnad-view.component.html',
  styleUrls: ['./dugnad-view.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class DugnadViewComponent implements OnInit {

  @Input()
  dugnad: Dugnad;

  startTime:any = {};
  endTime:any = {};

  constructor(private router: Router) { }

  ngOnInit() {
    let time = this.dugnad.getTimesAsObeject();
    this.startTime = time[0]
    this.endTime = time[1]
    console.log("DUGNADSTATUS: " + this.dugnad.status);

  }

  onClick(event){
    console.log("im clicked");
    this.router.navigate(['dugnad/', this.dugnad.uuid]);
  }

}
