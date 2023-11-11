import { createAction, props } from '@ngrx/store';

export const SET_LOADING_COMICS_ACTION =
  '[shared state] set loading spinner for comics';

export const SET_LOADING_CHARACTERS_ACTION =
  '[shared state] set loading spinner for characters';

export const SET_LOADING_EVENTS_ACTION =
  '[shared state] set loading spinner for events';

export const SET_LOADING_DETAILS_ACTION =
  '[shared state] set loading spinner for details';

export const SET_LOADING_LOCAL_CHARACTERS_ACTION =
  '[shared state] set loading spinner for local characters';

export const setLoadingSpinnerForComics = createAction(
  SET_LOADING_COMICS_ACTION,
  props<{ status: boolean }>()
);

export const setLoadingSpinnerForCharacters = createAction(
  SET_LOADING_CHARACTERS_ACTION,
  props<{ status: boolean }>()
);

export const setLoadingSpinnerForEvents = createAction(
  SET_LOADING_EVENTS_ACTION,
  props<{ status: boolean }>()
);

export const setLoadingSpinnerForDetails = createAction(
  SET_LOADING_DETAILS_ACTION,
  props<{ status: boolean }>()
);
