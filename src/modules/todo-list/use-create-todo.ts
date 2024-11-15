import { useAppDispatch } from "../../shared/redux";
import { CreateTodoThunk, useCreateLoading } from "./create-todo-thunk";

export function useCreateTodo() {
  const appDispatch =useAppDispatch()
 const isLoading=useCreateLoading()

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = await new FormData(e.currentTarget);
   await e.preventDefault();
    const text = await String(formData.get("text") ?? "");
   await  appDispatch(CreateTodoThunk(text))
   await e.currentTarget.reset();
  };

  return { handleCreate,isLoading };
}
