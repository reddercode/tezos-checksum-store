import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsComponent } from './logs/logs.component';
import { LogsRoutingModule } from './logs-routing.module';
import { LogsResolverService } from './logs-resolver.service';



@NgModule({
  declarations: [LogsComponent],
  imports: [
    CommonModule,
    LogsRoutingModule
  ],
  providers: [LogsResolverService]
})
export class LogsModule { }
