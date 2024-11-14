import { configureStore, createSelector, ThunkAction, combineSlices, UnknownAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch, useStore, TypedUseSelectorHook } from 'react-redux';

export const rootReducer=combineSlices()

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<R, AppState,any,UnknownAction>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
});

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppStore = () => useStore<typeof store>();

export const createAppSelector = createSelector as unknown as typeof createSelector;
