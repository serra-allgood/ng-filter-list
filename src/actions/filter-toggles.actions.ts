import { Action } from '@ngrx/store';

export const TOGGLE = '[Filter] Toggle';
export const ADD = '[Filter] Add';

export class Toggle implements Action {
  readonly type = TOGGLE;

  constructor(public payload: string) {}
}

export class Add implements Action {
  readonly type = ADD;

  constructor(public payload: string) {}
}

export type ALL = Toggle | Add;
