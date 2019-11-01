import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContractService } from '../core/contract.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogsResolverService implements Resolve<any> {

  constructor(
    private contractService: ContractService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<any> {
    const id = route.params['entity']
    return this.contractService.getEntry(id).pipe((map(({ ...entity }) => {
      return { id, ...entity }
    })))
  }
}
