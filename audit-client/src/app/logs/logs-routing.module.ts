import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsComponent } from './logs/logs.component';
import { LogsResolverService } from './logs-resolver.service';

const routes: Routes = [
  {
    path: ':entity',
    component: LogsComponent,
    resolve: {
      entity: LogsResolverService
    },
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
