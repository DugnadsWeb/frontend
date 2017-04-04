import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { DialogWindowDirective } from '../../directives/dialog-window.directive';

@Component({
  selector: 'dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.css']
})

export class DialogContainerComponent implements AfterViewInit, OnDestroy {

  @Input()
  component;

  @Input()
  btnText;

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
    //cr.instance.data = this.componentData;
  }

  ngOnDestroy(){

  }

  closeDialog(){
    this.dialogWindow.vcRef.clear();
    this.isActive = false;
  }



}
