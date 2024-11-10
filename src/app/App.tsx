import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/query-client";
import TodoList from "../modules/todo-list/todo-list";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default  function App() {

  return (
   <>
   <QueryClientProvider client={queryClient}>
<div className="">
  <TodoList/>
</div>
<ReactQueryDevtools initialIsOpen={false}/>
   </QueryClientProvider>
   </>
  )
}
