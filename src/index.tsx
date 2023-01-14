import '@rainbow-me/rainbowkit/styles.css';
import App from 'components/App.js';
import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(<App />);
