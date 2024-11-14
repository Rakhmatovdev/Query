import { useAppDispatch } from "../../shared/redux"
import { LogoutThunk } from "./logout-thunk"

export function LogoutButton(){
    const dispatch=useAppDispatch()
    return <button className="border border-rose-500 p-3 rounded" onClick={()=>dispatch(LogoutThunk())}>Log Out</button>
}