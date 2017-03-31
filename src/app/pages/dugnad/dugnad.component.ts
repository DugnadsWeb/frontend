import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Dugnad } from '../../models/models';
import { DugnadService, AuthService } from '../../services/services';
import { DugnadInfoComponent } from '../../components/dugnad-info/dugnad-info.component';


@Component({
  selector: 'app-dugnad',
  templateUrl: './dugnad.component.html',
  styleUrls: ['./dugnad.component.css']
})
export class DugnadComponent implements OnInit {

  dugnad: Dugnad;

  isAdmin: boolean;

  constructor(private route: ActivatedRoute,
    private dugnadService: DugnadService,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.dugnadService.getDugnad(params['id']))
    .subscribe((dugnad: Dugnad) => {
      this.dugnad = dugnad;
      this.isAdmin = this.authService.isAdminOf(dugnad.orgUuid);
    });



  }

}
