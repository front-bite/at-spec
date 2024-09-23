import { createBrowserRouter } from 'react-router-dom';

import { ROUTES_MAP } from 'src/_common/routes/routesMap';
import { AppLayout } from 'src/components/AppLayout/AppLayout';
import { CreateOperationForm } from 'src/pages/CreateForm/CreateForm';
import { HomePage } from 'src/pages/HomePage/HomePage';
import { ModelPage } from 'src/pages/ModelPage/ModelPage';
import { NotFoundPage } from 'src/pages/NotFoundPage/NotFoundPage';

/** Конфигурация роутера. */
export const ROUTER_CONFIG = createBrowserRouter(
  [
    {
      path: ROUTES_MAP.HOME,
      element: <AppLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: ROUTES_MAP.CREATE_FORM,
          element: <CreateOperationForm />,
        },
        {
          path: ROUTES_MAP.ESCROW_PAYMENT_OPERATION,
          element: <ModelPage />,
        },
        {
          path: ROUTES_MAP.CIVIL_ESCROW_AGREEMENT_DEPONENT,
          element: <ModelPage />,
        },
        {
          path: ROUTES_MAP.CIVIL_ESCROW_AGREEMENT_BENEFICIARY,
          element: <ModelPage />,
        },
        {
          path: ROUTES_MAP.TAX_ATTRIBUTES,
          element: <ModelPage />,
        },
        {
          path: ROUTES_MAP.NOT_FOUND,
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  { basename: '/at-spec' }
);
