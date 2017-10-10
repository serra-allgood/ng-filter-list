import { ModuleWithProviders, NgModule } from '@angular/core';

import { FilterListComponent } from './filter-list/filter-list.component';
import { FilledArrayPipe } from './pipes/filled-array.pipe';

@NgModule({
  declarations: [FilterListComponent, FilledArrayPipe],
  exports: [FilterListComponent]
})
export class NgFilterListModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: NgFilterListModule };
  }
}
