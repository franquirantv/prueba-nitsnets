import { Action, createReducer, on } from '@ngrx/store';
import { setLoadingSpinner } from './shared.action';
import { SharedState, initialSharedState } from './shared.state';

const _sharedReducer = createReducer(
  initialSharedState,
  on(setLoadingSpinner, (state, { status }) => {
    return {
      ...state,
      showLoading: status,
    };
  })
);

export function SharedReducer(state: SharedState | undefined, action: Action) {
  return _sharedReducer(state, action);
}
