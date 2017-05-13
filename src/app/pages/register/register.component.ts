import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {Overlay} from "angular2-modal";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	firstName = '';
  lastName = '';
  email = '';
  password = '';

  constructor(private userService: UserService, private router: Router, public modal: Modal, overlay: Overlay, vcRef: ViewContainerRef)
  {overlay.defaultViewContainer = vcRef; }

  ngOnInit() {
  }

	onSubmit(event) {
      this.userService.register(this.firstName, this.lastName, this.email, this.password).subscribe((result) => {
        if (result) {
          this.router.navigate(['login']);
        }
      },(error:any) => {
        if(error){
          this.modal.alert()
            .title('Noe gikk galt')
            .body('Kontakt oss hvis problemet vedvarer')
            .dialogClass('modalStyle')
            .okBtn('ok')
            .open();
        }
      });
    }
}
