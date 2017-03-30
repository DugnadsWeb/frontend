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
    let st = new Date(+this.dugnad.startTime);
    let et = new Date(+this.dugnad.endTime);

    this.startTime.year = st.getFullYear();
    this.startTime.month = st.getMonth()+1;
    this.startTime.day = st.getDate();
    this.startTime.hour = st.getHours();
    this.startTime.min = st.getMinutes();

    this.endTime.year = et.getFullYear();
    this.endTime.month = et.getMonth()+1;
    this.endTime.day = et.getDate();
    this.endTime.hour = et.getHours();
    this.endTime.min = et.getMinutes();

  }

}
