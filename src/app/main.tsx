import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { queryClient } from "../shared/api/query-client";
import { store } from "../shared/redux";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  
     <QueryClientProvider client={queryClient}>
     <Provider store={store}>
    <App />
    </Provider>
<ReactQueryDevtools initialIsOpen={false}/>
   </QueryClientProvider>
)
