import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Schema } from '@taquito/michelson-encoder';
import { combineLatest, observable } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';
import { ContractService } from 'src/app/core/contract.service';
import { TzstatsService } from 'src/app/core/tzstats.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private tzStats: TzstatsService,
    private contract: ContractService
  ) { }

  public entity$ = this.route.data.pipe(map(({ entity }) => {
    return entity;
  }), shareReplay());

  updates$ = combineLatest(this.entity$.pipe(pluck('id')), this.contract.bigMapID$)
    .pipe(
      switchMap(([key, id]) => {
        return this.tzStats.getUpdates(id, key)
      }),
      switchMap((updates) => {
        return this.contract.storage.pipe(
          pluck('entries'),
          map((entries: any) => {
            return updates.map((update) => (entries.schema as Schema).ExecuteOnBigMapValue(update.value))
          }))
      }),
      map((updates) => updates.sort((x, y) => x.date_updated > y.date_updated ? -1 : 1)),
      ((source) => {
        return source;
      })
    );

  ngOnInit() {
    console.log('logs-component')
  }

}
