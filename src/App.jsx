import { useState ,useEffect} from 'react'
import './App.css'
import Navbar from './componants/Navbar'
import { v4 as uuidv4 } from 'uuid';
uuidv4();
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

useEffect(() => {
  let todoString= localStorage.getItem("todos")
  if(todoString){
 let todos =JSON.parse(localStorage.getItem("todos"))
 setTodos(todos)
}
}, [])

  const saveto =(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
const handleedit=(e,id)=>{
  let t=todos.filter(i=>i.id==id)
  setTodo(t[0].todo)
  let newTodos=todos.filter(item=>{
    return item.id!==id
  });
  setTodos(newTodos)
  saveto()

}
const handledelete=(e,id)=>{
 
  let newTodos=todos.filter(item=>{
    return item.id!==id
  });
  setTodos(newTodos)
  saveto()

}
const handleadd=()=>{
  setTodos([...todos,{id:uuidv4(),todo,isCompleted: false}])
  setTodo("")
  saveto()

}
const handlechange=(e)=>{
  setTodo(e.target.value)
}
const handlebox=(e) => {
  let id=e.target.name ; 
  let index = todos.findIndex(item=>{
    return item.id===id;
  })
  let newTodos=[...todos];
  newTodos[index].isCompleted=!newTodos[index].isCompleted;
  setTodos(newTodos)
  saveto()
}
const togglefinished=(e) => {
  setshowfinished(!showfinished)

  
}


  return (
    <>
      <Navbar/>
     <div id='a' className="md:container  mx-3 md:mx-auto my-8 rounded-xl p-5 bg-zinc-500 min-h-[80vh] md:w-1/2">
     <h1 className='font-bold text-centre text-3xl'>myTask-manage your task at one place</h1>

       <div className="addtodo my-5 flex flex-col gap-4">
        <h2 className='text-xl font-bold my-5'>Add a Task</h2>
       <input type="text" className='  rounded-lg px-5 py-1 w-full' onChange={handlechange} value={todo}/>
       <button disabled={todo.length<1} className='bg-gray-1000 hover:bg-slate-500  py-1 text-white rounded-md  font-bold ' onClick={handleadd}>Save</button>
       </div>
       <input className='my-4 bg-gray-600' id='show' onChange={togglefinished} type="checkbox" checked={showfinished} /> 
       <label className='mx-2' htmlFor="show">Show Finished</label> 
       <h2 className='text-xl font-bold'>Your Tasks</h2>
       <div className="todos">{todos.length===0&& <div className='m-5'> No task to display</div> }
        {todos.map(item=>{

         return(showfinished || !item.isCompleted)&& <div  key={item.id} className="todo flex  md:w-1\2 my-3 justify-between">
          <div className='flex gap-5'>

          <input name={item.id}onChange={handlebox} className='bg-slate-600' type="checkbox" checked= {item.isCompleted}/>
<div className={item.isCompleted?"line-through":""}>{item.todo}</div>    
          </div>
<div className="btn flex h-full">
  <button  className='bg-gray-800 hover:bg-slate-500 p-3 py-1 text-white rounded-md mx-2 font-bold' onClick={(e)=>{handleedit(e,item.id)}}><FaEdit /></button>
  <button  className='bg-gray-800 hover:bg-slate-500 p-3 py-1 text-white rounded-md mx-2 font-bold ' onClick={(e)=>{handledelete(e,item.id)}}><RiDeleteBin6Fill /></button>
</div>
    </div>
      })}
       </div>
     
       </div>
       
    </>
  )
}

export default App
