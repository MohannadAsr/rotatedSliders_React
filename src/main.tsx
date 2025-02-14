import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './styles/global.scss';

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
  </BrowserRouter>
);
