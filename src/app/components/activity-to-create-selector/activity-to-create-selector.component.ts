import { Component, OnInit, EventEmitter } from '@angular/core';
import { DialogContainerComponent, Dialogable} from '../dialog-container/dialog-container.component';
import { CreateActivityComponent} from '../create-activity/create-activity.component';
import { CreateSalesActivityComponent } from '../create-sales-activity/create-sales-activity.component';

@Component({
  selector: 'app-activity-to-create-selector',
  templateUrl: './activity-to-create-selector.component.html',
  styleUrls: ['./activity-to-create-selector.component.css']
})
export class ActivityToCreateSelectorComponent implements OnInit, Dialogable {

  createActivityComponent = CreateActivityComponent;
  createSalesActivityComponent = CreateSalesActivityComponent;

  data:any;
  events = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  selectActivityType(component){
    this.events.emit({type:'changeComponent', component:component});
  }


}
