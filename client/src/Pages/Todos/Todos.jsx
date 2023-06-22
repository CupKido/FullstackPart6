import { useEffect, useState, useContext } from "react";
import { NewTodoForm } from "../../Components/ToDo/NewTodoForm/NewTodoForm.jsx";
import "./TodosStyle.css";
import { TodoList } from "../../Components/ToDo/TodoList/TodoList.jsx";
import ComboBoxSort from "../../Components/ToDo/ComboBoxSort/ComboBoxSort.jsx";
import ApiContext from "../../ApiContext";
import { useUser } from '../../UserContext'
export function Todos() {
  
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("Todos");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });
  const user = useUser();
  const api = useContext(ApiContext);

  useEffect(() => {
    console.log('todos.length')
    if (todos.length == 0) {
      api.get('/tasks/' + user._id ).then((response) => {
        console.log(response.data);
        setTodos(response.data);
      }).catch((error) => {
        console.log(error)
      })
    }
  }, []);

  useEffect(() => {
    console.log("Todos has changed");
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        { id: crypto.randomUUID(), title, completed: false },
        ...currentTodos,
      ];
    });
  }

  // function sortById() that sorts the todos by id
  function sortById() {
    setTodos((currentTodos) => {
      const sortedTodos = [...currentTodos].sort((a, b) => a.id - b.id);
      return sortedTodos;
    });
  }

  // function sortByTitle() that sorts the todos by title
  function sortByTitle() {
    setTodos((currentTodos) => {
      const sortedTodos = [...currentTodos].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      return sortedTodos;
    });
  }

  // function sortByCompleted() that sorts the todos by completed
  function sortByCompleted() {
    setTodos((currentTodos) => {
      const sortedTodos = [...currentTodos].sort(
        (a, b) => a.completed - b.completed
      );
      return sortedTodos;
    });
  }

  // function sortByRandom() that sorts the todos randomly
  function sortByRandom() {
    setTodos((currentTodos) => {
      const sortedTodos = [...currentTodos].sort(() => Math.random() - 0.5);
      return sortedTodos;
    });
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <main>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <ComboBoxSort
        SortById={sortById}
        SortByTitle={sortByTitle}
        SortByComplited={sortByCompleted}
        RandomSort={sortByRandom}
      />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </main>
  );
}

export default Todos;
