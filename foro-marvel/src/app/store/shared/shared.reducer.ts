import { Action, createReducer, on } from '@ngrx/store';
import {
  setLoadingSpinnerForCharacters,
  setLoadingSpinnerForComics,
  setLoadingSpinnerForDetails,
  setLoadingSpinnerForEvents,
} from './shared.action';
import { SharedState, initialSharedState } from './shared.state';

const _sharedReducer = createReducer(
  initialSharedState,
  on(setLoadingSpinnerForCharacters, (state, { status }) => {
    return {
      ...state,
      showLoadingCharacters: status,
    };
  }),
  on(setLoadingSpinnerForComics, (state, { status }) => {
    return {
      ...state,
      showLoadingComics: status,
    };
  }),
  on(setLoadingSpinnerForEvents, (state, { status }) => {
    return {
      ...state,
      showLoadingEvents: status,
    };
  }),
  on(setLoadingSpinnerForDetails, (state, { status }) => {
    return {
      ...state,
      showLoadingDetails: status,
    };
  })
);

export function SharedReducer(state: SharedState | undefined, action: Action) {
  return _sharedReducer(state, action);
}
