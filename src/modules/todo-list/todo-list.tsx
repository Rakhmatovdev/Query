import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { todoListApi } from "./api"
import { useState } from "react"



const TodoList = () => {
const [page, setPage] = useState(1)
const [enabled, setEnabled] = useState(false)
    const {data:todoItems,error,isPlaceholderData,status,fetchStatus}=useQuery({queryKey:['tasks','list',{page}],
      queryFn:(meta)=>todoListApi.getTogoList({page},meta),
      placeholderData:keepPreviousData,
      enabled: enabled
    })

if(status==="pending" && fetchStatus==="fetching"){
    return <div>Loading...</div>
}

if(error){
    return <div className="">error: {JSON.stringify(error)}</div>
}

  return (
    <div><h1 className="text-3xl font-bold underline max-w-[1200px mt-10]  ">TodoList</h1> 
    <button onClick={()=>setEnabled(e=>!e)}>Toggle enabled</button>
       <div className={"flex flex-col gap-4 mt-4"+(isPlaceholderData?" opacity-50":"")}> {todoItems?.data.map(todo=><div key={todo.id} className="border border-slate-300 rounded p-3">{todo.text}</div>)}
    </div>
    
    <div className="flex gap-2 mt-10">
    <button onClick={()=>setPage(page=>Math.max(page-1,1))} className={"p-3 rounded border border-teal-500"+(isPlaceholderData?" cursor-not-allowed opacity-50  ":"")}>Prew</button>
    <button onClick={()=>setPage(page=>Math.min(page+1,todoItems?.pages ?? 1))} className={"p-3 rounded border border-teal-500"+(isPlaceholderData?" cursor-not-allowed opacity-50  ":"")}>Next</button>
    </div>
    </div>
  )
}

export default TodoList


