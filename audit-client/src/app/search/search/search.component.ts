import { Component, OnInit } from '@angular/core';
import { TzstatsService } from 'src/app/core/tzstats.service';
import { ContractService } from 'src/app/core/contract.service';
import { map, switchMap } from 'rxjs/operators';
import { SearchStoreService } from '../search-store.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public keys$ = this.store.keys$;
  constructor(
    private store: SearchStoreService
  ) { }


  ngOnInit() {
  }

}
