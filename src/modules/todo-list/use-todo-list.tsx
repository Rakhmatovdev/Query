import { useQuery } from "@tanstack/react-query"
import { todoListApi } from './api';

export const useTodoList = () => {

    const { data: todoItems, error, isLoading} = useQuery({
        ...todoListApi.getTodoListQueryOptions(),
        select: data => Array.isArray(data) ? data.slice().reverse():[] // Use slice().reverse() instead of toReversed()
    })

    return { todoItems, error, isLoading}
}
