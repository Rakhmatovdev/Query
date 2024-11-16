
import { useMutation ,useQueryClient } from "@tanstack/react-query";
import { TodoDto, todoListApi } from "./api";
import { useSuspenceUser } from "../hooks/use-user";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const user=useSuspenceUser()

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    async onSettled() {
      queryClient.invalidateQueries({queryKey:[todoListApi.baseKey]});
    },
    async onSuccess(_,deletedId){
          queryClient.setQueryData<TodoDto[]>(
            todoListApi.getTodoListQueryOptions({userId:user.data.id}).queryKey,
           todos=> todos?.filter(item => item.id !== deletedId)
          );
        }
  });


  return {
    handleDelete: deleteTodoMutation.mutate,
    isPending:(id:string)=> deleteTodoMutation.isPending && deleteTodoMutation.variables ===id
  };
}