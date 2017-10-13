import { StoreModule } from '@ngrx/store';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterListComponent, FilterToggleEvent, Menu } from './filter-list/filter-list.component';
import { FilledArrayPipe } from './pipes/filled-array.pipe';
import { menuToggles } from './reducers/menu-toggles.reducer';
import { filterToggles } from './reducers/filter-toggles.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('menuToggles', menuToggles),
    StoreModule.forFeature('filterToggles', filterToggles)
  ],
  declarations: [FilterListComponent, FilledArrayPipe],
  exports: [FilterListComponent]
})
export class NgFilterListModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: NgFilterListModule, providers: [] };
  }
}

export { FilterToggleEvent, Menu } from './filter-list/filter-list.component';
