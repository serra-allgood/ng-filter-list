import * as toggleActions from '../actions/menu-toggles.actions';

export type Action = toggleActions.ALL;

export function menuToggles(state: object = {}, action: Action): object {
  const newToggle = {};

  switch (action.type) {
    case toggleActions.ADD:
      newToggle[action.payload] = true;

      return { ...newToggle, ...state };
    case toggleActions.TOGGLE:
      const toggle = !state[action.payload];
      newToggle[action.payload] = toggle;

      return { ...state, ...newToggle };
    default:
      return state;
  }
}
