import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { SearchRoutingModule } from './search-routing.module';



@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
