import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDialogWindow]'
})
export class DialogWindowDirective {

  constructor(public vcRef: ViewContainerRef) { }

}
