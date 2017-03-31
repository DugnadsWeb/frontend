import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DugnadService } from '../../services/services';
import { Dugnad } from '../../models/models';

@Component({
  selector: 'app-make-dugnad',
  templateUrl: './make-dugnad.component.html',
  styleUrls: ['./make-dugnad.component.css']
})
export class MakeDugnadComponent implements OnInit {

  @Input()
  orgUuid: string;

	dugName = "";
	dugDescription = "";
	dugLocation = "";
	dugStartDate = "";
	dugStartTime = "";
	dugEndDate = "";
	dugEndTime = "";
	dugAnt = "";


  constructor(private dugnadService : DugnadService, private router : Router) { }

  ngOnInit() {
  }

	onSubmit(event)
	{
    let sd = this.dugStartDate.split('-');
    let st = this.dugStartTime.split(':');
    let ed = this.dugEndDate.split('-');
    let et = this.dugEndTime.split(':');
    let dugnad = new Dugnad(null, this.orgUuid, this.dugName, this.dugDescription,
      this.dugLocation, new Date(+sd[0], +sd[1], +sd[2], +st[0], +st[1]).getTime(),
      new Date(+ed[0], +ed[1], +ed[2], +et[0], +et[1]).getTime(),
      this.dugAnt);


		this.dugnadService.registrerdug(dugnad, this.orgUuid)
    .subscribe((result)	=> {
			if(result)
			{
				//this.router.navigate(['org/'+this.orgUuid]);
			}
		});

	}
}
