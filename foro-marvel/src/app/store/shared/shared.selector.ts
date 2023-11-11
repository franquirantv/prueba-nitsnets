import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';

export const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getLoadingCharacters = createSelector(getSharedState, state => {
  return state.showLoadingCharacters;
});

export const getLoadingComics = createSelector(getSharedState, state => {
  return state.showLoadingComics;
});

export const getLoadingEvents = createSelector(getSharedState, state => {
  return state.showLoadingEvents;
});

export const getLoadingDetails = createSelector(getSharedState, state => {
  return state.showLoadingDetails;
});
