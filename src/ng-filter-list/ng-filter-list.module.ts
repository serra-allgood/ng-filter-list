import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { NgFilterList } from './ng-filter-list.component';
import { FilledArrayPipe } from '../pipes/filled-array.pipe';
import { menuToggles } from '../reducers/menu-toggles.reducer';
import { filterToggles } from '../reducers/filter-toggles.reducer';

@NgModule({
  declarations: [NgFilterList, FilledArrayPipe],
  imports: [
    CommonModule,
    StoreModule.forFeature('menuToggles', menuToggles),
    StoreModule.forFeature('filterToggles', filterToggles)
  ],
  exports: [NgFilterList]
})
export class NgFilterListModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: NgFilterListModule };
  }
}
