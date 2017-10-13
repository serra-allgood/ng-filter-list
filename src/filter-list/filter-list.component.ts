import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';

import { MenuState } from '../menu-state.interface';
import * as FilterToggles from '../actions/filter-toggles.actions';
import * as MenuToggles from '../actions/menu-toggles.actions';

export interface Menu {
  name: string;
  filters: Array<string>;
  subMenus?: Array<Menu>;
}

export interface FilterToggleEvent {
  menu: string;
  filters: Array<string>;
  toggle: boolean;
}

@Component({
  selector: 'ng-filter-list',
  template: `
    <ul class="list-group">
      <ng-container *ngFor="let menu of menus">
        <li class="list-group-item toggle" (click)="toggleMenu(menu.name)">
          <i class="fa" [ngClass]="{ 'fa-chevron-right': isCollapsed(menu.name), 'fa-chevron-down': !isCollapsed(menu.name) }"></i>
          &nbsp;
          {{ menu.name }}
        </li>
        <li class="list-group-item filter"
            [hidden]="isCollapsed(menu.name)"
            *ngFor="let filter of menu.filters"
            [ngClass]="{ active: isToggled(filter) }"
            (click)="toggleFilter(filter)">
          {{ filter }}
        </li>
        <div *ngFor="let subMenu of menu.subMenus" [hidden]="isCollapsed(menu.name)">
          <ng-container *ngTemplateOutlet="subMenuDisplay; context: { subMenu: subMenu, count: 1 }">
          </ng-container>
        </div>
      </ng-container>
    </ul>

    <ng-template #subMenuDisplay let-subMenu="subMenu" let-count="count">
      <li class="list-group-item toggle" (click)="toggleMenu(subMenu.name)">
        <span *ngFor="let i of count | filledArray">&emsp;</span>
        <i class="fa" [ngClass]="{ 'fa-chevron-right': isCollapsed(subMenu.name), 'fa-chevron-down': !isCollapsed(subMenu.name) }"></i>
        &nbsp;
        {{ subMenu.name }}
      </li>
      <li class="list-group-item filter"
          [hidden]="isCollapsed(subMenu.name)"
          *ngFor="let subFilter of subMenu.filters"
          [ngClass]="{ active: isToggled(subFilter) }"
          (click)="toggleFilter(subFilter)">
        <span *ngFor="let i of count | filledArray">&emsp;</span>
        {{ subFilter }}
      </li>
      <div *ngFor="let recursiveMenu of subMenu.subMenus" [hidden]="isCollapsed(subMenu.name)">
        <ng-container *ngTemplateOutlet="subMenuDisplay; context: { subMenu: recursiveMenu, count: count + 1 }">
        </ng-container>
      </div>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
    }`,
    `.toggle,
    .filter {
      cursor: pointer;
    }`,
    `.list-group {
      display: flex;
      flex-direction: column;
      padding-left: 0;
      margin-bottom: 0;
      list-style: none;
    }`,
    `.list-group-item:first-child {
      border-top-right-radius: .25rem;
      border-top-left-radius: .25rem;
    }`,
    `.list-group-item:last-child {
      border-bottom-right-radius: .25rem;
      border-bottom-left-radius: .25rem;
    }`,
    `.list-group-item {
      position: relative;
      flex-flow: row wrap;
      align-items: center;
      padding: .75rem 1.25rem;
      margin-bottom: -1px;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, .125);
    }`
  ]
})
export class FilterListComponent implements OnChanges, OnInit, OnDestroy {
  menuToggles = {};
  filterToggles = {};
  menuToggles$: Observable<object>;
  menuTogglesSub: Subscription;
  filterToggles$: Observable<object>;
  filterTogglesSub: Subscription;
  @Input() menus: Array<Menu>;
  @Output() filterToggled = new EventEmitter<FilterToggleEvent>();

  constructor(private store: Store<MenuState>) {
    this.menuToggles$ = this.store.select(s => s.menuToggles);
    this.filterToggles$ = this.store.select(s => s.filterToggles);
  }

  ngOnChanges(): void {
    _.each(this.menus, menu => this.defineToggles(menu));
  }

  ngOnInit(): void {
    this.menuTogglesSub = this.menuToggles$.subscribe(toggles => {
      this.menuToggles = toggles || {};
    });

    this.filterTogglesSub = this.filterToggles$.subscribe(toggles => {
      this.filterToggles = toggles || {};
    });
  }

  ngOnDestroy(): void {
    this.menuTogglesSub.unsubscribe();
    this.filterTogglesSub.unsubscribe();
  }

  defineToggles(menu: Menu): void {
    this.store.dispatch(new MenuToggles.Add(menu.name));

    _.each(menu.filters, filter => this.store.dispatch(new FilterToggles.Add(filter)));

    if (menu.subMenus)
      _.each(menu.subMenus, subMenu => this.defineToggles(subMenu));
  }

  toggleMenu(menuName: string): void {
    this.store.dispatch(new MenuToggles.Toggle(menuName));

    if (this.menuToggles[menuName]) {
      const menu = this.findMenu(menuName, this.menus);
      let filters = menu.filters;

      filters = this.concatSubMenuFilters(menu, filters);
      filters = _.filter(filters, filter => {
        return this.filterToggles[filter];
      });

      if (filters.length > 0) {
        _.each(filters, filter => {
          this.store.dispatch(new FilterToggles.Toggle(filter));
        });

        this.filterToggled.emit({ menu: menu.name, filters, toggle: false });
      }
    }
  }

  toggleFilter(filter: string): void {
    this.store.dispatch(new FilterToggles.Toggle(filter));
    const menu = this.findMenu(filter, this.menus, true);
    this.filterToggled.emit({ menu: menu.name, filters: [filter], toggle: this.filterToggles[filter] });
  }

  isCollapsed(menu: string): boolean {
    return this.menuToggles[menu];
  }

  isToggled(filter: string): boolean {
    return this.filterToggles[filter];
  }

  findFilter(filter: string, searchStart: Array<Menu>): string {
    const result = _.find(searchStart, menu => {
      if (_.includes(menu.filters, filter))
        return true;
      else if (menu.subMenus)
        return !!this.findFilter(filter, menu.subMenus);
      else
        return false;
    });

    return result.name;
  }

  findMenu(target: string, searchStart: Array<Menu>, targetIsFilter = false): Menu | undefined {
    let targetMenu: Menu;

    if (targetIsFilter)
      _.each(searchStart, menu => {
        if (_.includes(menu.filters, target))
          targetMenu = targetMenu || menu;
        else if (menu.subMenus)
          targetMenu = targetMenu || this.findMenu(target, menu.subMenus, targetIsFilter);
      });
    else
      _.each(searchStart, menu => {
        if (menu.name === target)
          targetMenu = targetMenu || menu;
        else if (menu.subMenus)
          targetMenu = targetMenu || this.findMenu(target, menu.subMenus);
      });

    return targetMenu;
  }

  concatSubMenuFilters(menu: Menu, filters: Array<string>): Array<string> {
    if (menu.subMenus) {
      filters = _.concat(filters, _.flatMap(menu.subMenus, subMenu => subMenu.filters));

      _.each(menu.subMenus, subMenu => {
        filters = this.concatSubMenuFilters(subMenu, filters);
      });

      return filters;
    } else
      return filters;
  }
}
