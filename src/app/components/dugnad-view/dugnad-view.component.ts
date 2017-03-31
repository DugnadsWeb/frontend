import { Component, OnInit, Input } from '@angular/core';
import { Dugnad } from '../../models/models';

@Component({
  selector: 'dugnad-view',
  templateUrl: './dugnad-view.component.html',
  styleUrls: ['./dugnad-view.component.css']
})
export class DugnadViewComponent implements OnInit {

  @Input()
  dugnad: Dugnad;

  startTime:any = {};
  endTime:any = {};

  constructor() { }

  ngOnInit() {
    let time = this.dugnad.getTimesAsObeject();
    this.startTime = time[0]
    this.endTime = time[1]

  }

}
