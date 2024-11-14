import { useMutation } from '@tanstack/react-query';
import { AppThunk } from '../../shared/redux';
import { queryClient } from '../../shared/api/query-client';
import { authSlice } from './auth.slice';
export const LogoutThunk=():AppThunk=> async(dispatch)=>{
    dispatch(authSlice.actions.removeUser())
    queryClient.removeQueries()
    localStorage.removeItem('userId')
}
export const useLoginLoading=()=>{
    useMutation({
        mutationKey:['login']
    }).isPending
}