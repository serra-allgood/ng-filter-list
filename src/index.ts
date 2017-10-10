import { ModuleWithProviders, NgModule } from '@angular/core';

import { FilterListModule } from './filter-list/filter-list.module';

@NgModule({
  imports: [FilterListModule.forRoot()],
  exports: [FilterListModule]
})
export class NgRootModule {}

@NgModule({
  imports: [FilterListModule],
  exports: [FilterListModule]
})
export class NgFilterListModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: NgRootModule };
  }
}
