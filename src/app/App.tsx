import Login from "../modules/auth/login";
import { useUser } from "../modules/hooks/use-user";
import TodoList from "../modules/todo-list/todo-list";
import { LogoutButton } from "../modules/auth/logout-button";

export default function App() {
  const user = useUser();
  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (user.data) {
    return (
      <>
        <div className="flex container mt-10 mx-auto justify-end items-center">
          <LogoutButton />
        </div>
        <TodoList />
      </>
    );
  }

  return <Login />;
}
