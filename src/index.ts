import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterListComponent } from './filter-list/filter-list.component';
import { FilledArrayPipe } from './pipes/filled-array.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FilterListComponent, FilledArrayPipe],
  exports: [FilterListComponent]
})
export class NgFilterListModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: NgFilterListModule, providers: [] };
  }
}
