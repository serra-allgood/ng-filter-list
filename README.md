# NgFilterList

## Description
Toggleable Menu with any number of submenus. Meant to be used with @ngrx/store,
so that the toggled menu state is remembered between page changes. Optional
dependency on Font Awesome for some togge indicators for the menu, which you'll
have to include in your project yourself.

## Installation
To install this component to an external project, follow this procedure:
1. __npm install ng-filter-list --save__ or __yarn add ng-filter-list__
2. Add __NgFilterListModule.forRoot()__ import to your __@NgModule__ like below
    ```js
    import { NgModule } from '@angular/core'
    import { BrowserModule } from '@angular/platform-browser'
    import { NgFilterListModule } from 'ng-filter-list'
    import { AppComponent } from './app.component'

    @NgModule({
      imports: [
        BrowserModule,
        NgFilterListModule.forRoot()
      ],
      declarations: [AppComponent],
      bootstrap: [AppComponent]
    })
    export class AppModule {}
    ```

## Usage
The __<ng-filter-list>__ component takes a `[menus]` input that's an __Array<Menu>__ and the exported __Menu__ interface is
defined as:
    ```js
    interface Menu {
      name: string;
      filters: Array<string>;
      subMenus: Array<Menu>;
    }
    ```

The component outputs a __FilterToggleEvent__, which is also exported, defined as:
    ```js
    interface FilterToggleEvent {
      menu: string;
      filters: Array<string>;
      toggle: boolean;
    }
    ```
So if a user collapses an entire menu of toggles, only one event is emitted.

## License
License: MIT

## Author
Serra Allgood
