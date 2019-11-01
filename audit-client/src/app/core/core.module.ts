import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TzstatsService } from './tzstats.service';
import { ContractService } from './contract.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    TzstatsService,
    ContractService
  ]
})
export class CoreModule { }
