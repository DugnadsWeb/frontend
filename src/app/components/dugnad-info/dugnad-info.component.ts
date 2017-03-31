import { Component, OnInit, Input } from '@angular/core';
import { Dugnad } from '../../models/models';

@Component({
  selector: 'dugnad-info',
  templateUrl: './dugnad-info.component.html',
  styleUrls: ['./dugnad-info.component.css']
})
export class DugnadInfoComponent implements OnInit {

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
