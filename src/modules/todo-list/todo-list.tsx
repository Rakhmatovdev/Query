import { useQuery } from "@tanstack/react-query"
import { todoListApi } from "./api"



const TodoList = () => {

    const {data,error,isPending}=useQuery({queryKey:['tasks','list'],queryFn:todoListApi.getLogoList})

if(isPending){
    return <div>Loading...</div>
}

if(error){
    return <div className="">error: {JSON.stringify(error)}</div>
}

  return (
    <div>TodoList
        {data?.map(todo=><div>{todo.text}</div>)}
    </div>
  )
}

export default TodoList


