import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	first_name = '';
  last_name = '';
  email = '';
  password = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

	onSubmit(event) {
      this.userService.register(this.first_name, this.last_name, this.email, this.password).subscribe((result) => {
        if (result) {
          this.router.navigate(['']);
        }
      });
    }
}
