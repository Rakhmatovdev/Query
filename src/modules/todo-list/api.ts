import { infiniteQueryOptions } from "@tanstack/react-query"

const BASE_URL='http://localhost:3000'

export type PaginateResult<T>={
data:T[],
first:number,
items:number,
last:number,
next:number | null,
pages:number,
prev:number | null
}

export type TodoDto={
    id:string,
    text:string,
    done:boolean
    }

export const todoListApi={
getTogoList:({page}:{page:number},{signal}:{signal:AbortSignal})=>{
   return fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=4`,{signal}).then(res=>res.json()) as Promise<PaginateResult<TodoDto>>
},
getTodoListInfiniteQueryOptions:()=>{
    return infiniteQueryOptions({
        queryKey:['tasks','list'],
        queryFn:(meta)=>todoListApi.getTogoList({page:meta.pageParam},meta),
      initialPageParam:1,
      getNextPageParam:result=>result.next,
      select:result=>result.pages.flatMap(page=>page?.data) 
    })
}
}

