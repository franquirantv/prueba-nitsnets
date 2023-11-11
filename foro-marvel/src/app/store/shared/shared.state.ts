export interface SharedState {
  showLoadingComics: boolean;
  showLoadingEvents: boolean;
  showLoadingDetails: boolean;
  showLoadingCharacters: boolean;
}

export const initialSharedState: SharedState = {
  showLoadingComics: false,
  showLoadingEvents: false,
  showLoadingDetails: false,
  showLoadingCharacters: false,
};
