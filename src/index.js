import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const appContainer = document.getElementById('app');

if (appContainer) {
  const root = createRoot(appContainer);
  root.render(<App />);
}
