import { useSuspenseQuery } from "@tanstack/react-query"
import { todoListApi } from './api';
import { useSuspenceUser } from "../hooks/use-user";

export const useTodoList = () => {

    const user=useSuspenceUser()

    const { data: todoItems,refetch} = useSuspenseQuery({
        ...todoListApi.getTodoListQueryOptions({userId:user.data.id}),
        select: data => [...data].reverse()  })

    return { todoItems, refetch}
}
