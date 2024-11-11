import { useInfiniteQuery } from "@tanstack/react-query"
import { todoListApi } from './api';
import { useCallback, useRef, useState } from "react"



const TodoList = () => {
const [enabled, setEnabled] = useState(false)

    const {data:todoItems,error,isPlaceholderData,isLoading,fetchNextPage,hasNextPage,isFetchingNextPage}=useInfiniteQuery({
      ...todoListApi.getTodoListInfiniteQueryOptions(),
      enabled: enabled,
   
    })

    const cursorRef=useIntersection(()=>{
      fetchNextPage()
    })

if(isLoading){
    return <div>Loading...</div>
}

if(error){
    return <div className="">error: {JSON.stringify(error)}</div>
}



  return (
    <div><h1 className="text-3xl font-bold underline max-w-[1200px mt-10]  ">TodoList</h1> 
    <button onClick={()=>setEnabled(e=>!e)}>Toggle enabled</button>
       <div className={"flex flex-col gap-4 mt-4"+(isPlaceholderData?" opacity-50":"")}> {todoItems?.map(todo=><div key={todo.id} className="border border-slate-300 rounded p-3">{todo.text}</div>)}
    </div>
    <div className="flex gap-2 mt-4" ref={cursorRef}>
      {!hasNextPage && <div>Dont have information</div>}
      {isFetchingNextPage && <div>...Loading</div>}
      </div>
    </div>
  )
}

export default TodoList

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
