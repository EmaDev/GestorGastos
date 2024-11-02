import React from 'react';
import ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import './index.css';
import { IndexRouter } from './router/IndexRouter';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
        <IndexRouter />
    </NextUIProvider>
  </React.StrictMode>,
)
