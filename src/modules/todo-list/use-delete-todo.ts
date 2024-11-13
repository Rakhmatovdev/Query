
import { useMutation ,useQueryClient } from "@tanstack/react-query";
import { TodoDto, todoListApi } from "./api";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    async onSettled() {
      queryClient.invalidateQueries(todoListApi.getTodoListQueryOptions());
    },
    async onSuccess(_,deletedId){
        const todos = queryClient.getQueryData<TodoDto[]>(todoListApi.getTodoListQueryOptions().queryKey);

        if (todos && Array.isArray(todos)) {
          queryClient.setQueryData<TodoDto[]>(
            todoListApi.getTodoListQueryOptions().queryKey,
            todos.filter(item => item.id !== deletedId)
          );
        }
        
    }
  });


  return {
    handleDelete: deleteTodoMutation.mutate,
    isPending:(id:string)=> deleteTodoMutation.isPending && deleteTodoMutation.variables ===id
  };
}