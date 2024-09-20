import type { EnhancedStore } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { attributeBackendTable } from 'src/_common/components/AttributeBackendTable/BackendTableSlice';
import { dragDropEdit } from 'src/_common/components/DragDropEdit/DragDropEditSlice';
import { editDrawer } from 'src/_common/components/EditDrawer/EditDrawerSlice';
import { formAccessTable } from 'src/_common/components/FormAccessTable/FormAccessTableSlice';
import { frontendTableSlice } from 'src/_common/components/FrontendTable/FrontendTableSlice';
import { loadingScreenForm } from 'src/_common/components/ListWithConditions/LoadingScreenFormSlice';

/** Комбайн редьюсеров приложения. */
const rootReducer = combineReducers({
  loadingScreenForm: loadingScreenForm.reducer,
  dragDropEdit: dragDropEdit.reducer,
  formAccessTable: formAccessTable.reducer,
  attributeBackendTable: attributeBackendTable.reducer,
  editDrawer: editDrawer.reducer,
  frontendTableSlice: frontendTableSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  blacklist: [
    loadingScreenForm.reducerPath,
    dragDropEdit.reducerPath,
    formAccessTable.reducerPath,
    attributeBackendTable.reducerPath,
    editDrawer.reducerPath,
    frontendTableSlice.reducerPath,
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/** Конфигурация хранилища Redux Store. */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([]),
});

export const persistor = persistStore(store);

/** Получение типа state. */
export type RootState = ReturnType<typeof rootReducer>;
/** Получение типа store. */
export type AppStore = EnhancedStore;
/** Получение типа dispatch. */
export type AppDispatch = AppStore['dispatch'];
