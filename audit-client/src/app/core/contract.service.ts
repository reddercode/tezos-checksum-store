import { Injectable } from '@angular/core';
import { defer, from, BehaviorSubject } from 'rxjs';
import { shareReplay, switchMap, map, tap, first, withLatestFrom } from 'rxjs/operators';

import { Tezos } from '@taquito/taquito'

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private _network$ = new BehaviorSubject('https://api.tez.ie/rpc/babylonnet')
  private _contractID = new BehaviorSubject('KT1L8eyHG2k2fGJxLxQNatG2p62pXu6cd7zH')

  public network$ = this._network$.asObservable().pipe(tap(() => console.log('test')));
  public contractID$ = this._contractID.asObservable();

  private taquito$ = this.network$.pipe(map((network) => {
    Tezos.setProvider({ rpc: network })
    return Tezos;
  })).pipe(shareReplay());

  constructor() { }

  public contract$ = defer(() => {
    return this.taquito$.pipe(withLatestFrom(this._contractID), switchMap(([taquito, contractID]) => {
      return taquito.contract.at(contractID)
    }))
  }).pipe(shareReplay());

  public storage = this.contract$.pipe(switchMap((contract) => {
    return contract.storage();
  }))

  public bigMapID$ = this.storage.pipe(map((storage: any) => {
    return storage.entries.id.toString();
  }))

  public getEntry(key: string) {
    return this.storage.pipe(switchMap((storage: any) => {
      return storage.entries.get(key);
    }), first());
  }

  public parseEntry(value: any) {
    return this.storage.pipe(switchMap((storage: any) => {
      return storage.entries.schema.Execute(value);
    }));
  }
}
