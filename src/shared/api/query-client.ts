import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    //serverga hadeb so'rov yuboravermasdan keshdan oladi
    queries: {
      staleTime: 1 * 60 * 1000
    }
  } //
});
