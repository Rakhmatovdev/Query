import { MutationObserver, useMutation } from '@tanstack/react-query';
import { AppThunk } from '../../shared/redux';
import { queryClient } from '../../shared/api/query-client';
import { authApi } from './api';
import { authSlice } from './auth.slice';
export const LoginThunk=(login:string,password:string):AppThunk=> async(
    dispatch
)=>{
   const user=await new MutationObserver(queryClient,{
    mutationKey:["login"],
    mutationFn:authApi.loginUser
   }).mutate({
    login,password
   })

if(user){
    dispatch(authSlice.actions.addUser({
        userId:user.id
    }))
    queryClient.setQueriesData(authApi.getUserById(user.id),user)
    localStorage.setItem('userId',user.id)
}

dispatch(authSlice.actions.setError('Password or email is not valid'))

}

export const useLoginLoading=()=>{
    useMutation({
        mutationKey:['login']
    }).isPending
}