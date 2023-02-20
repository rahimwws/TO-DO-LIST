import { useState, useEffect } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import img from './search-interface-symbol.png'
import { Button } from './Button';
function App() {
  const [inputText, setInput] = useState("");
  const [SearchText, setSearch] = useState("");
  const [tasks, setTasks] = useState([]);
  const [SearchTasks, setSearchTasks] = useState([]);
  const [inputMod, setInputMod] = useState("tasks");
  // const [FavTasks, setFavTasks] = useState([]);
  useEffect(()=>{
    const localTask = localStorage.getItem('task')
    if (localTask){
      const parsed = JSON.parse(localTask)
      setTasks(parsed)
    } else{
      localStorage.setItem('task',JSON.stringify([]))
    }
  },[])



  console.log(nanoid());
  function handleChangeEnter({key}) {
    if (key === "Enter"){
      btnClick()
    }
  }
  const handleChange = (event)=>{
    setInput(event.target.value);
  }
  function btnClick() {
    if (inputText !== "") {
      const newTask = {
        id: nanoid(),
        text:inputText
      }
      setTasks([...tasks, newTask]);
      localStorage.setItem('task',JSON.stringify([...tasks, newTask]))
      setInput("");
    }
  }

  const handleDelete = (taskId) => {
    const filtered = tasks.filter((task) => {
      if (taskId !== task.id) {
        return task
      }
    });
    setSearchTasks(filtered)
    setTasks(filtered);
    localStorage.setItem('task',JSON.stringify(filtered))
  };
  const handleDeleteAll = () => {
    localStorage.clear('task')
    setTasks([]);
  }
  const toggleSearch = ()=>{
    if(inputMod === 'tasks') {
      setSearchTasks(tasks)
      setInputMod('search')
    }
    if(inputMod === 'search') setInputMod('tasks')
  }
  const handleSearchChange = (event)=>{
    setSearch(event.target.value)

    const filteredTask = tasks.filter((task)=>{
      if(task.text.includes(event.target.value)) return task
    })
    setSearchTasks(filteredTask)
  }
  const inputValue = inputMod === 'tasks' ? inputText:SearchText
  const handleInput = inputMod === 'tasks' ? handleChange:handleSearchChange
  const currentTasks = inputMod === 'tasks' ? tasks: SearchTasks
  // const handleFav = (taskIndex)=>{
  //   const filter = FavTasks.filter((task,favIndex)=>{
  //     if(favIndex!== taskIndex){
  //       setFavTasks([...FavTasks,task])
  //     }
  //     console.log(FavTasks);
  //   }) 
  // }

  
  return (
    <div className="App"> 
      <div className="todo-actions">
    <button onClick={toggleSearch} className= 'searchBtn'><img src={img} width = '15px'/></button> 
     
        <input type="text" value={inputValue} onChange={handleInput} onKeyUp = {handleChangeEnter}/>
        { inputMod === 'tasks' && (
          <>
         <Button onClick = {btnClick} color = 'red-btn'>Add</Button>
         <Button onClick = {handleDeleteAll}>Delete All</Button>
       
        </>
        )}
      </div>
        <div className="tasks">
          <div className="task">
          <ol>
            {currentTasks.map((task, taskIndex) => (
              <li className="listItem" key={task.id}>
                {task.text}
                <button onClick={() => handleDelete(task.id)} className= 'deleteBtn'>delete</button>
                {/* <button onClick={()=>handleFav(taskIndex)} className = 'favBtn'>add to fav</button> */}
              </li>
            ))}
          </ol>
            </div>
        </div>
      

    </div>
  );
}

export default App;
