import { Component, OnInit } from '@angular/core';
import { ContractService } from '../core/contract.service';
import { TzstatsService } from '../core/tzstats.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(private contract: ContractService, private tzStats: TzstatsService) { }
  public network$ = this.contract.network$;
  public contractID$ = this.contract.contractID$;
  public indexURL$ = this.tzStats.apiURL$;

  ngOnInit() {
  }

}
