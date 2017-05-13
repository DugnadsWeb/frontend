import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { Router } from '@angular/router';
import { OrgService } from '../../services/org.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'angular2-modal';

@Component({
  selector: 'app-register-organization',
  templateUrl: './register-organization.component.html',
  styleUrls: ['./register-organization.component.css']
})
export class RegisterOrganizationComponent implements OnInit {

	orgNumber = "";
	orgName = "";
	email = "";
	phone = "";
	description = "";

  constructor(private orgService : OrgService, private router : Router, public modal: Modal, overlay: Overlay, vcRef: ViewContainerRef) {
  	overlay.defaultViewContainer = vcRef;
  	}

  ngOnInit() {
  }

	onSubmit(event)
	{
		this.orgService.registerOrg(this.orgNumber, this.orgName, this.email, this.phone, this.description).subscribe((result)	=> {
			if(result)
			{
				/*this.router.navigate(['']);*/
           this.modal.alert()
					.title('Vellykket!')
					.body('Organisasjonen ble opprettet')
					.dialogClass('modalStyle')
					.okBtn('ok')
					.open();
			}
		},(error:any) => {
		  if(error){
        this.modal.alert()
          .title('Noe gikk galt')
          .body('Sjekk at alle felter er riktig fyllt ut')
          .dialogClass('modalStyle')
          .okBtn('ok')
          .open();
      }
    });
	}
}
