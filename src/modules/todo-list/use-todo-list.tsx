import { useInfiniteQuery } from "@tanstack/react-query"
import { todoListApi } from './api';
import { useCallback, useRef } from "react";
export  const useTodoList = () => {

    const {data:todoItems,error,isLoading,fetchNextPage,hasNextPage,isFetchingNextPage}=useInfiniteQuery({
        ...todoListApi.getTodoListInfiniteQueryOptions(),
     
      })
  
      const cursorRef=useIntersection(()=>{
        fetchNextPage()
      })

  const cursor=(
    <div className="flex gap-2 mt-4" ref={cursorRef}>
      {!hasNextPage && <div>Dont have information</div>}
      {isFetchingNextPage && <div>...Loading</div>}
      </div>
  )
  return {cursor,todoItems,error,isLoading}
}


export function useIntersection(onIntersect:()=>void){
    const unsubscribe=useRef(()=>{})
    return useCallback((el:HTMLDivElement | null)=>{
     const obServer= new IntersectionObserver((entries)=>{
        entries.forEach((intersection)=>{
          if(intersection.isIntersecting){
  onIntersect()
          }
        })
      })
      if(el){
  obServer.observe(el)
  unsubscribe.current =()=>obServer.disconnect()
      } else{
  unsubscribe.current()
}
},[])
  }

