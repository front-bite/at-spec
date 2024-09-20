import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';
import { ROUTER_CONFIG } from 'src/_common/routes/routes';

import { persistor, store } from './store/store';

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={ROUTER_CONFIG} />
      </DndProvider>
    </PersistGate>
  </Provider>
);
