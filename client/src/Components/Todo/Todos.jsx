import { useState, useMemo, useEffect, useRef, useContext } from 'react'
import Task from './task'
import '../../styles/Todos.css'
import { useUser } from '../../UserContext'
import ApiContext from '../../ApiContext'
let user = {}
function Todos() {
    const user = useUser()
    const [task_title, setTitle] = useState('')
    let task_id = useMemo(() => 0, [])
    const [sortMethod, setSortMethod] = useState('serial') // serial, alphabetic, completed, random
    const [Tasks, setTasks] = useState([])
    const inputRef = useRef(null);
    const api = useContext(ApiContext);
    
    // initial fetch for tasks
    useEffect(() => {
      // user = JSON.parse(localStorage.getItem('user'))
      api.get('/tasks/' + user._id ).then((response) => {
        console.log(response.data);
        setTasks(response.data);
      }).catch((error) => {
        console.log(error)
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
      const data = {
        title: task_title
      }
      api.post('/tasks/' + user._id + '/CreateTask', data).then((response) => {
        console.log(response.data);
        const tasks = [...Tasks, { title: task_title, completed: false, _id: response.data._id }]
        inputRef.current.value = '';
        updateTasks(tasks)
      }).catch((error) => {
        console.log(error)
      });
      
      
      
    }

    function updateTasks(tasks){
      if(sortMethod === 'completed' || sortMethod === 'alphabetic'){
        setTasks(sortTasks(tasks))
      }else{
        setTasks(tasks)
      }
    }


    function HadleCompleteTask(task_id){
      Tasks.forEach((task, i) => {
        if (task._id === task_id) {
          const data = {
            completed: !task.completed,
            title: task.title
          }
          api.put('/tasks/' + user._id + '/' + task_id, data).then((response) => {
            if (task_id == response.data){
              const tasks = [...Tasks];
              data._id = task_id;
              tasks[i] = data;
              updateTasks(tasks)
            }
          }).catch((error) => {
            console.log(error)
          });
          return;
        }
      });
    }

    function HadleDeleteTask(task_id){
      api.delete('/tasks/' + user._id + '/' + task_id).then((response) => {
        if (task_id == response.data){
          let tasks = Tasks.filter((task) => task._id !== task_id)
          updateTasks(tasks)
        }
      }).catch((error) => {
        console.log(error)
      });
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
        <Task key={index} title={task.title} completed={task.completed} taskId={task._id} onCompletedChange={HadleCompleteTask} onDelete={HadleDeleteTask} />
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