import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface BigMapKeyResponse {
  key_type: string;
  key_encoding: string;
  key_hash: string;
  key: string;
  time: string;
  height: number;
}

export interface BigMapValueResponse {
  key: BigMapKeyResponse;
  value: any;
}

export interface BigMapKeyUpdatesResponse {
  big_map: string;
  action: string;
  key: {
    string?: string;
    int?: string;
    bytes?: string;
  };
  key_hash: string;
  value: any;
}

@Injectable({
  providedIn: 'root'
})
export class TzstatsService {

  public apiURL$ = new BehaviorSubject('https://api.babylonnet.tzstats.com')

  constructor(
    private http: HttpClient
  ) { }

  public getBigMapKeys(id: string) {
    return this.apiURL$.pipe(switchMap((url) => {
      return this.http.get<BigMapKeyResponse[]>(`${url}/explorer/bigmap/${id}/keys`)
    }))
  }

  public getBigMapValue(id: string, key: string) {
    return this.apiURL$.pipe(switchMap((url) => {
      return this.http.get<BigMapValueResponse>(`${url}/explorer/bigmap/${id}/keys/${key}`)
    }))
  }

  public getUpdates(id: string, key: string) {
    return this.apiURL$.pipe(switchMap((url) => {
      return this.http.get<BigMapKeyUpdatesResponse[]>(`${url}/explorer/bigmap/${id}/${key}/updates`)
    }))
  }
}
