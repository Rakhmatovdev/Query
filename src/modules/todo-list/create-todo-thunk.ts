import {  MutationObserver, useMutation } from '@tanstack/react-query';
import { AppThunk } from '../../shared/redux';
import { queryClient } from '../../shared/api/query-client';
import { TodoDto, todoListApi } from './api';
import { nanoid } from 'nanoid';
import { authSlice } from '../auth/auth.slice';
import { authApi } from '../auth/api';

export const CreateTodoThunk=(text:string):AppThunk=> async(
    _,getStata
)=>{
const userId=authSlice.selectors.userId(getStata())

if(!userId){
    throw new Error("User is not login")
}
const user = await queryClient.fetchQuery(authApi.getUserById(userId))
const newTodo:TodoDto={
    id:nanoid(),
    done:false,
    text:`text ${text}. Owner: ${user.login}`,
    userId
}

queryClient.cancelQueries({
    queryKey:[todoListApi.baseKey]
})

const prevTasks=queryClient.getQueryData(todoListApi.getTodoListQueryOptions({userId}).queryKey)

queryClient.setQueryData(todoListApi.getTodoListQueryOptions({userId}).queryKey,tasks=>[...tasks ?? [],newTodo])

try {
  new MutationObserver(queryClient,{
        mutationFn: todoListApi.createTodo,
}).mutate(newTodo)

} catch (error) {
  queryClient.setQueryData(todoListApi.getTodoListQueryOptions({userId}).queryKey,prevTasks)  
} finally{
    queryClient.invalidateQueries({queryKey:[todoListApi.baseKey]})
}



   }
export const useCreateLoading=()=>{
    useMutation({
        mutationKey:['create-todo']
    }).isPending
}