import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { queryClient } from "../shared/api/query-client";
import { store } from "../shared/redux";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { onlineManager } from "@tanstack/react-query";
import { Loader } from "./loader.tsx";
import { prefetchAuth } from "../modules/auth/prefetch.ts";

onlineManager.setOnline(navigator.onLine);

const persister = createSyncStoragePersister({
  storage: window.localStorage
});
prefetchAuth();

createRoot(document.getElementById("root")!).render(
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{ persister }}
    onSuccess={() => {
      queryClient.resumePausedMutations().then(() => {
        queryClient.invalidateQueries();
      });
    }}
  >
    <Provider store={store}>
      <Loader>
     
        <App />
      </Loader>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </PersistQueryClientProvider>
);

