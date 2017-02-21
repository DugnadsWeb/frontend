import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService} from '../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit() {
  }

  onSubmit(event) {
      this.authService.login(this.email, this.password).subscribe((result) => {
        if (result) {
          this.router.navigate(['']);
        }
      });
    }
}
