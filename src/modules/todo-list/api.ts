const BASE_URL='http://localhost:3000'

export type TodoDto={
    id:string,
    text:string,
    done:boolean
    }

export const todoListApi={
getLogoList:()=>{
   return fetch(`${BASE_URL}/tasks`).then(res=>res.json()) as Promise<TodoDto[]>
}
}