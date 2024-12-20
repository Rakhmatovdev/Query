import { useTodoList } from "./use-todo-list"
import { useCreateTodo } from './use-create-todo';
import { useDeleteTodo } from "./use-delete-todo";
import { useToggleTodo } from "./use-toggle-todo";
import { useSuspenceUser } from "../hooks/use-user";


const TodoList = () => {

const {todoItems}=useTodoList()
const {data:user}=useSuspenceUser()
const createTodo=useCreateTodo() 
const deleteTodo=useDeleteTodo()
const {toggleTodo}=useToggleTodo()
  return (
    <div className="container mx-auto"><h1 className="text-3xl font-bold underline max-w-[1200px mt-10 mb-5  ">TodoList: Owner <span className="text-teal-500 ">{user.login}</span></h1> 
<form className="flex gap-2 mb-5" onSubmit={createTodo.handleCreate}>
<input className="rounded p-2 border-teal-500 border" type="text" name="text" />
<button disabled={createTodo.isLoading!} className="rounded p-2 border-teal-500 border disabled:opacity-50">Create</button>
</form>


  <div className={"flex flex-col gap-4 mt-4"}> {todoItems?.map(todo=><div key={todo.id} className="border border-slate-300 rounded p-3 flex justify-between items-center">
        <div className="flex gap-10">
          <input type="checkbox"  checked={todo.done} onChange={()=>toggleTodo(todo.id,todo.done)}/>
            {todo.text} 

        </div>

        <button disabled={deleteTodo.isPending(todo.id)} className="text-rose-500 font-bold  disabled:text-red-300 " onClick={()=>deleteTodo.handleDelete(todo.id)}>Delete</button>
      </div>)}
    </div>
    </div>
  )
}

export default TodoList

