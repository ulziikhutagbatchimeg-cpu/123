import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { watchForNewBuild } from './lib/freshBuild';

// Keeps the page on the newest build, so a link to the site always opens the latest version
watchForNewBuild();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
