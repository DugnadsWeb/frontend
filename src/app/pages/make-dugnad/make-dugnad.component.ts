import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DugnadService } from '../../services/services';

@Component({
  selector: 'app-make-dugnad',
  templateUrl: './make-dugnad.component.html',
  styleUrls: ['./make-dugnad.component.css']
})
export class MakeDugnadComponent implements OnInit {
	
	dugNavn = "";
	dugBeskrivelse = "";
	dugSted = "";
	dugStartDato = "";
	dugStartTid = "";
	dugSluttDato = "";
	dugSluttTid = ""; 
	dugAnt = "";
	
	
  constructor(private dugnadService : DugnadService, private router : Router) { }

  ngOnInit() {
  }
	
	onSubmit(event)
	{
		this.dugnadService.registrerdug(this.dugNavn, this.dugBeskrivelse, this.dugSted, this.dugStartDato, this.dugStartTid, this.dugSluttDato, this.dugSluttTid, this.dugAnt).subscribe((result)	=> {
			if(result)
			{
				this.router.navigate(['']);
			}
		});
	}
}
