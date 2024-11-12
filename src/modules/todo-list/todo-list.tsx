import { useMutation } from "@tanstack/react-query"
import { useTodoList } from "./use-todo-list"
import { todoListApi } from "./api"
import { nanoid } from "nanoid"



const TodoList = () => {
const {isLoading,error,todoItems,cursor}=useTodoList()

const createTodoMutation= useMutation({
  mutationFn:todoListApi.createTodo
})

if(isLoading){
    return <div>Loading...</div>
}

if(error){
    return <div className="">error: {JSON.stringify(error)}</div>
}

const handleCreate=(e:React.FormEvent<HTMLFormElement>)=>{
const formData= new FormData(e.currentTarget)

const text=String(formData.get('text') ?? '')

createTodoMutation.mutate({
  id: nanoid(),
  done:false,
  text,
  userId:"1"


})

e.currentTarget.reset()
}

  return (
    <div className="container mx-auto"><h1 className="text-3xl font-bold underline max-w-[1200px mt-10 mb-5  ">TodoList</h1> 

<form className="flex gap-2 mb-5" onSubmit={handleCreate}>
<input className="rounded p-2 border-teal-500 border" type="text" name="text" />
<button className="rounded p-2 border-teal-500 border">Create</button>
</form>


       <div className={"flex flex-col gap-4 mt-4"}> {todoItems?.map(todo=><div key={todo.id} className="border border-slate-300 rounded p-3">{todo.text}</div>)}
    </div>
    {cursor}
    </div>
  )
}

export default TodoList

