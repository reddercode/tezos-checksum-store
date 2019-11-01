import { Injectable } from '@angular/core';
import { TzstatsService } from '../core/tzstats.service';
import { ContractService } from '../core/contract.service';
import { switchMap, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchStoreService {

  constructor(
    private tzStats: TzstatsService,
    private contract: ContractService
  ) { }

  public keys$ = this.contract.bigMapID$.pipe(switchMap((id) => {
    return this.tzStats.getBigMapKeys(id)
  }), map((keys) => {
    return keys.map((key) => {
      return {
        id: key.key,
        added: key.time
      }
    })
  }), shareReplay());
}
