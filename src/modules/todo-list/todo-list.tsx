import { useQuery } from "@tanstack/react-query"
import { todoListApi } from "./api"
import { useState } from "react"



const TodoList = () => {
const [page, setPage] = useState(1)
    const {data:todoItems,error,isPending}=useQuery({queryKey:['tasks','list',{page}],
      queryFn:(meta)=>todoListApi.getTogoList({page},meta)})

if(isPending){
    return <div>Loading...</div>
}

if(error){
    return <div className="">error: {JSON.stringify(error)}</div>
}

  return (
    <div><h1 className="text-3xl font-bold underline max-w-[1200px mt-10]  ">TodoList</h1> 
       <div className="flex flex-col gap-4 mt-4"> {todoItems?.data.map(todo=><div key={todo.id} className="border border-slate-300 rounded p-3">{todo.text}</div>)}
    </div>
    
    <div className="flex gap-2 mt-10">
    <button onClick={()=>setPage(page=>Math.max(page-1,1))} className="p-3 rounded border border-teal-500">Prew</button>
    <button onClick={()=>setPage(page=>Math.min(page+1,todoItems.pages))} className="p-3 rounded border border-teal-500">Next</button>
    </div>
    </div>
  )
}

export default TodoList


