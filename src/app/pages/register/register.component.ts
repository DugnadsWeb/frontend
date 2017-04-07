import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

	onSubmit(event) {
      this.userService.register(this.firstName, this.lastName, this.email, this.password).subscribe((result) => {
        if (result) {
          this.router.navigate(['login']);
        }
      });
    }
}
