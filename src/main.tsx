import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import './index.css';
import { IndexRouter } from './router/IndexRouter';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <IndexRouter />
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>,
)
