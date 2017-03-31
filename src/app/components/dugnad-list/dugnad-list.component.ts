import { Component, OnInit, Input } from '@angular/core';
import { OrgService } from '../../services/services';
import { Dugnad } from '../../models/models';

@Component({
  selector: 'app-dugnad-list',
  templateUrl: './dugnad-list.component.html',
  styleUrls: ['./dugnad-list.component.css']
})
export class DugnadListComponent implements OnInit {

  @Input()
  uuid: string;

  dugnads: Dugnad[];

  constructor(private orgService: OrgService) { }

  ngOnInit() {
    this.orgService.getDugnads(this.uuid)
    .subscribe(res => {
      console.log(res);
      this.dugnads = res;
    })


  }

}
