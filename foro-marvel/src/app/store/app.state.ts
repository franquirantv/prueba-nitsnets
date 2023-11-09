import { SharedReducer } from './shared/shared.reducer';
import { SHARED_STATE_NAME } from './shared/shared.selector';
import { SharedState } from './shared/shared.state';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
};
