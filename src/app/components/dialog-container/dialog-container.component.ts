import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { DialogWindowDirective } from '../../directives/dialog-window.directive';

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
export class DialogContainerComponent implements AfterViewInit, OnDestroy {

  @Input()
  component;
  @Input()
  btnText;

  @Output()
  events = new EventEmitter();

  @Input()
  title: string;

  @Input()
  componentData:any;

  isActive: boolean = false;

  @ViewChild(DialogWindowDirective) dialogWindow: DialogWindowDirective;

  constructor(private cfr: ComponentFactoryResolver) { }

  ngAfterViewInit(){

  }

  openDialog(){

    this.isActive = true;

    let cf = this.cfr.resolveComponentFactory(this.component);
    let vcRef = this.dialogWindow.vcRef;
    vcRef.clear();

    let cr = vcRef.createComponent(cf);
    (<any>cr).instance.data = this.componentData;
    // subscribe to confirm and cancle events
    (<any>cr).instance.events.subscribe(event => {
      if(event.type == 'close') { this.closeDialog()}
      this.events.emit(event);
    });
    //cr.instance.data = this.componentData;
  }

  ngOnDestroy(){

  }

  closeDialog(){
    this.dialogWindow.vcRef.clear();
    this.isActive = false;
  }



}
