import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { DialogWindowDirective } from '../../directives/dialog-window.directive';
//import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

export interface Dialogable {
  events: EventEmitter<any>;
  data:any;
}

@Component({
  selector: 'dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.css']
})

/*
* This is the dialog component. It is used as a host for other components.
* To close the dialog emit an event with type: "close".
* The dialog component relays events emitted through "events" to its parent.
*
* TODO implement a cancle button
*/
export class DialogContainerComponent implements OnInit, OnDestroy {

  // component to host
  @Input()
  component;
  // button text for button to open dialog
  @Input()
  btnText;
  // relay between host and child components
  @Output()
  events = new EventEmitter();
  @Input()
  componentData:any;
  // title of the dialog window
  // not used
  @Input()
  title: string;

  //private dom = new BrowserDomAdapter();

  // component to be opened by this.openDialog()
  activeComponent;
  // indicates if the dialog window is open or not
  isActive: boolean = false;

  @ViewChild(DialogWindowDirective) dialogWindow: DialogWindowDirective;

  constructor(private cfr: ComponentFactoryResolver) { }

  ngOnInit(){
    this.activeComponent = this.component;
  }

  openDialog(){
    //this.dom.setStyle(this.dom.query('body'), 'overflow', 'hidden');
    this.isActive = true;

    let cf = this.cfr.resolveComponentFactory(this.activeComponent);
    let vcRef = this.dialogWindow.vcRef;
    vcRef.clear();

    let cr = vcRef.createComponent(cf);
    (<any>cr).instance.data = this.componentData;
    // subscribe to confirm and cancle events
    (<any>cr).instance.events.subscribe(event => {
      this.eventHandler(event);
    });
    //cr.instance.data = this.componentData;
  }

  ngOnDestroy(){

  }

  closeDialog(){
    this.dialogWindow.vcRef.clear();
    this.isActive = false;
    this.activeComponent = this.component;
    //this.dom.setStyle(this.dom.query('body'), 'overflow', 'initial');
  }

  eventHandler(event){
    if(event.type == 'close') { this.closeDialog(); }
    if(event.type == 'changeComponent') { this.activeComponent = event.component;
       this.openDialog() }
    this.events.emit(event);
  }



}
