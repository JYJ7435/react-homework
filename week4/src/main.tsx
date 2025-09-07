import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './index.css';
import { router } from './routes/route';

const root = document.getElementById('root');
if (!root) throw new Error('문서에 #root 요소가 존재하지 않습니다.');

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
