import "./App.css";
import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js'

export default function App() {

  //paste your own credentials
  const supabase = createClient("https://xyzcompany.supabase.co", "public-anon-key")

  const [curr, setcurr] = useState("");
  const [todolist, settodolist] = useState([]);
  const [deleteid, setdeleteid] = useState(0);
  
  function handlechange(event) {
    const setcu = event.target.value;
    setcurr(setcu);
  }

  function handledeletechange(event) {
    const setdel = parseInt(event.target.value)
    setdeleteid(setdel)
  }

  useEffect(() => {
    loadData().catch(console.error)
  }, [])
  const loadData = async () => {
    let { data: todolist, error } = await supabase
    .from('todolist')
    .select('*')

    if(error) console.log('error', error)
    else settodolist(todolist)
  }
  async function handlesubmit(event) {
    event.preventDefault();
    const { data, error } = await supabase
    .from('todolist')
    .insert([
      { todos: curr },
    ])
    loadData();
  }

  async function handledelete(event) {
    event.preventDefault();
    const { data, error } = await supabase
    .from('todolist')
    .delete()
    .eq("id", deleteid)
    loadData();
  }
    
  return (
    <div className="App">
      <h1>This is a todo application</h1>
      <input placeholder="enter todo" onChange={handlechange} />
      <button onClick={handlesubmit} type="submit">
        Add
      </button>
      <input placeholder="enter number to be deleted" onChange = {handledeletechange} />
      <button onClick = {handledelete} type="submit" >Delete</button>
      <div>
        {todolist.map(todo=>(
          <li key = {todo.id}>{todo.id} {todo.todos}</li>
          ))
        }
      </div>
    </div>
  );
}
