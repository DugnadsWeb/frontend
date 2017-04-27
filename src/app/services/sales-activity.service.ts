import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';
import { ActivityService } from './activity.service';


@Injectable()
export class SalesActivityService extends ActivityService{

  constructor(authService: AuthService, 
     http:Http) { super(authService, http); }

}
