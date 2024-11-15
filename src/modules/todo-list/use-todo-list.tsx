import { useSuspenseQuery } from "@tanstack/react-query"
import { todoListApi } from './api';

export const useTodoList = () => {
    const { data: todoItems,refetch} = useSuspenseQuery({
        ...todoListApi.getTodoListQueryOptions(),
        select: data => [...data].reverse() // Array.isArray(data) ? data.slice().reverse():[] // Use slice().reverse() instead of toReversed()
    })

    return { todoItems, refetch}
}
