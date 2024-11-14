import { useQuery } from "@tanstack/react-query";
import { authApi } from "../auth/api";
import { useSelector } from "react-redux";
import { authSlice } from "../auth/auth.slice";

export function useUser(){
    const userId=useSelector(authSlice.selectors.userId) 
   return useQuery({
        ...authApi.getUserById(userId!),
        enabled:Boolean(userId)
    })
}