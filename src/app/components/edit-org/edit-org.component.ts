import { Component, OnInit, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { Organization } from '../../models/models';
import { OrgService } from '../../services/services';
import { Subscription } from 'rxjs';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'angular2-modal';

@Component({
  selector: 'edit-org',
  templateUrl: './edit-org.component.html',
  styleUrls: ['./edit-org.component.css']
})
export class EditOrgComponent implements OnInit, OnDestroy {


  org: Organization;
  orgSubscription: Subscription;

  constructor(private orgService: OrgService, public modal: Modal, overlay: Overlay, vcRef: ViewContainerRef) {
  	overlay.defaultViewContainer = vcRef;
  	}

  ngOnInit() {
    this.orgService.getOrgObservable().then(observer => {
      this.orgSubscription = observer.subscribe(org => {
        this.org = org;
      })
    })
  }

  ngOnDestroy(){
    if(this.orgSubscription)this.orgSubscription.unsubscribe();
  }

  onSubmit(event){
    this.orgService.editOrg(this.org);
						this.modal.alert()
					.title('Vellykket!')
					.body('Informasjonen har blitt endret')
					.dialogClass('modalStyle')
					.okBtn('ok')
					.open();
  }
}
