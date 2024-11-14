import { useAppDispatch, useAppSelector } from "../../shared/redux"
import { authSlice } from "./auth.slice"
import { LoginThunk, useLoginLoading } from "./login-thunk"

const Login = () => {

    const dispatch =useAppDispatch()
  const isLoading=useLoginLoading()
   const LoginError= useAppSelector(authSlice.selectors.loginError)

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault()
const formData=new FormData(e.currentTarget)
   
    dispatch(
      LoginThunk(
        formData.get("login")?.toString() ?? "",
        formData.get('password')?.toString() ?? ""

      )
    ) 
  }
  return (
    <div className="p-5 border border-slate-500 rounded-lg container mx-auto mt-10">
<form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
    <h1 className="font-bold text-xl ">Login</h1> 
    <input className="p-5 rounded border border-slate-500 " type="text" name="login" />
    <input className="p-5 rounded border border-slate-500 " type="password" name="password" />
    {LoginError && <div className="bg-rose-500 text-white rounded p-3">{LoginError}</div>}
    <button disabled={isLoading!} className="p-5 rounded bg-teal-500 text-white disabled:bg-slate-300">Sign in </button>

</form>
    </div>
  )
}

export default Login