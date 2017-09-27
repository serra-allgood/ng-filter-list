import { Action } from '@ngrx/store';

export const ADD = '[Menu] Add';
export const TOGGLE = '[Menu] Toggle';

export class Add implements Action {
  readonly type = ADD;

  constructor(public payload: string) {}
}

export class Toggle implements Action {
  readonly type = TOGGLE;

  constructor(public payload: string) {}
}

export type ALL = Add | Toggle;
