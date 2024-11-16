import { useMutation } from "@tanstack/react-query";
import { TodoDto, todoListApi } from "./api";
import { useQueryClient } from "@tanstack/react-query";
import { useSuspenceUser } from "../hooks/use-user";

export function useToggleTodo() {
  const queryClient = useQueryClient();

  const user=useSuspenceUser()

  const updateTodoMutation = useMutation({
    mutationFn: todoListApi.updateTodo,


    onMutate: async (newTodo) => {
      
        await queryClient.cancelQueries({ queryKey: [todoListApi.baseKey] })
    
        const previousTodos = queryClient.getQueryData(todoListApi.getTodoListQueryOptions({userId:user.data.id}).queryKey)
    
        queryClient.setQueryData<TodoDto[]>(todoListApi.getTodoListQueryOptions({userId:user.data.id}).queryKey,
         (old) => 
           old?.map((todo)=>todo.id === newTodo.id?{...todo,...newTodo}:todo)
        )
        
        return { previousTodos }
      },
     
      onError: (_, __, context) => {
        if(context){
          queryClient.setQueryData(todoListApi.getTodoListQueryOptions({userId:user.data.id}).queryKey, context.previousTodos)
        }
      },
      
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      },
  });

  const toggleTodo = (id:string,done:boolean) => {

    updateTodoMutation.mutate({
      id,
      done:!done
    });

  };

  return { toggleTodo, isPending: updateTodoMutation.isPending };
}
