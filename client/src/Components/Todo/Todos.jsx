import { useState, useMemo, useEffect, useRef } from 'react'
import Task from './task'
import '../../styles/Todos.css'
import { useUser } from '../../UserContext'

let user = {}
function Todos() {
    const user = useUser()
    const [task_title, setTitle] = useState('')
    let task_id = useMemo(() => 0, [])
    const [sortMethod, setSortMethod] = useState('serial') // serial, alphabetic, completed, random
    const [Tasks, setTasks] = useState([])
    const inputRef = useRef(null);

    async function getTasks(callback) {
      fetch('https://jsonplaceholder.typicode.com/todos?userId=' + user.id)
      .then(response => response.json())
      .then(json => callback(json));
    }
    
    // initial fetch for tasks
    useEffect(() => {
      // user = JSON.parse(localStorage.getItem('user'))
      
  
      getTasks((json)=>{
        setTasks(json)
      });
    }, []);


    const previousSortMethodRef = useRef(sortMethod);
    // sort tasks by sortMethod when sortMethod changes

    useEffect(() => {
      if (previousSortMethodRef.current !== sortMethod) {
        previousSortMethodRef.current = sortMethod;
      } else {
        return; // Ignore the first run
      }
      setTasks(sortTasks(Tasks));
    }, [sortMethod]);


    function addTask() {
      let id = -1
      for(let i = 0; i < Tasks.length; i++){
        if(Tasks[i].id > id){
          id = Tasks[i].id
        }
      }
      console.log("id: ", id)
      const tasks= [...Tasks, { title: task_title, completed: false, id: id + 1 }]
      inputRef.current.value = '';

      updateTasks(tasks)
    }

    function updateTasks(tasks){
      if(sortMethod === 'completed' || sortMethod === 'alphabetic'){
        setTasks(sortTasks(tasks))
      }else{
        setTasks(tasks)
      }
    }


    function HadleCompleteTask(task_id){
      let tasks = Tasks.map((task) => {
        if(task.id === task_id){
          task.completed = !task.completed
          fetch('https://jsonplaceholder.typicode.com/todos/' + task_id, {
            method: 'PUT',
            body: JSON.stringify({
              id: task_id,
              completed: task.completed
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          }).then((response) => response.json())
          .then((json) => console.log(json.completed === task.completed ? 'success' : 'fail'))
        }
        return task
      })

      updateTasks(tasks)
    }

    function HadleDeleteTask(task_id){
      let tasks = Tasks.filter((task) => task.id !== task_id)
      updateTasks(tasks)
    }



    function sortTasks(tasks){
      let sortedTasks = [...tasks];
      if(sortMethod === 'alphabetic'){
        sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
      }
      else if(sortMethod === 'completed'){
        sortedTasks.sort((a, b) => a.completed - b.completed);
      }
      else if(sortMethod === 'random'){
        sortedTasks.sort(() => Math.random() - 0.5);
      }
      else
      {
        sortedTasks.sort((a, b) => a.id - b.id);
      }
      return sortedTasks
    }


    function getTasksElements()
    {
      return Tasks.map((task, index) => (
        <Task key={index} title={task.title} completed={task.completed} taskId={task.id} onCompletedChange={HadleCompleteTask} onDelete={HadleDeleteTask} />
    ));
    }

    return (
      <div className="todo-container">
        <div className="todo-controls">
          <label className="todo-label">Add Task: </label>
          <input className="todo-input" type="text" id="taskTitle" ref={inputRef} onChange={(e) => setTitle(e.target.value)} />
          <button className="todo-button" onClick={addTask}>Add</button>
          <select className="todo-select" id="sotedBy" onChange={(e) => setSortMethod(e.target.value)}>
            <option value="serial">Serial</option>
            <option value="alphabetic">Alphabetic</option>
            <option value="completed">Completed</option>
            <option value="random">Random</option>
          </select>
        </div>
        {getTasksElements()}
      </div>
    );
    
  }

  export default Todos