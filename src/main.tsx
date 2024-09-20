import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'modern-normalize';
import { App } from 'src/App';

createRoot(document.getElementById('app') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
