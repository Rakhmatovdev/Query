import { useAppDispatch } from "../../shared/redux";
import { CreateTodoThunk, useCreateLoading } from "./create-todo-thunk";

export function useCreateTodo() {
  const appDispatch =useAppDispatch()
 const isLoading=useCreateLoading()

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const text = String(formData.get("text") ?? "");
    await appDispatch(CreateTodoThunk(text))
    e.currentTarget.reset();
  };

  return { handleCreate,isLoading };
}
