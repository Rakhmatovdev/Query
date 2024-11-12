import { useMutation } from '@tanstack/react-query';
import { todoListApi } from './api';
import { nanoid } from 'nanoid';
import { useQueryClient } from '@tanstack/react-query';

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    onSuccess() {
      queryClient.invalidateQueries(
        todoListApi.getTodoListQueryOptions()
        //{ queryKey: [todoListApi.baseKey],}

      
    );

    },
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const text = String(formData.get('text') ?? '');

    createTodoMutation.mutate({
      id: nanoid(),
      done: false,
      text,
      userId: '1',
    });

    e.currentTarget.reset();
  };

  return { handleCreate };
}
