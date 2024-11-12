import { useTodoList } from "./use-todo-list"



const TodoList = () => {
const {isLoading,error,todoItems,cursor}=useTodoList()

if(isLoading){
    return <div>Loading...</div>
}

if(error){
    return <div className="">error: {JSON.stringify(error)}</div>
}



  return (
    <div><h1 className="text-3xl font-bold underline max-w-[1200px mt-10]  ">TodoList</h1> 
       <div className={"flex flex-col gap-4 mt-4"}> {todoItems?.map(todo=><div key={todo.id} className="border border-slate-300 rounded p-3">{todo.text}</div>)}
    </div>
    {cursor}
    </div>
  )
}

export default TodoList

