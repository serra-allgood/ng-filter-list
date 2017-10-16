import { Action } from '@ngrx/store';

export const TOGGLE = '[Filter] Toggle';
export const ADD = '[Filter] Add';
export const RESET = '[Filter] Reset';

export class Toggle implements Action {
  readonly type = TOGGLE;

  constructor(public payload: string) {}
}

export class Add implements Action {
  readonly type = ADD;

  constructor(public payload: string) {}
}

export class Reset implements Action {
  readonly type = RESET;
}

export type ALL = Toggle | Add | Reset;
