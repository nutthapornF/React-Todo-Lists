//import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

function App() {
  const [todos, setTodos] = useState(() => {
    // get the todos from localstorage
    const savedTodos = localStorage.getItem("todos");
    // if there are todos stored
    if (savedTodos) {
      // return the parsed JSON object back to a javascript object
      return JSON.parse(savedTodos);
      // otherwise
    } else {
      // return an empty array
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    //const json = JSON.stringify(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo(""); //set defalut to empty
  }
  function deleteTodo(id) {
    const updatedTodo = [...todos].filter((todo) => todo.id !== id);

    setTodos(updatedTodo);
  }
  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        console.log(todo.completed);
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  function editTodo(id) {
    const updateTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updateTodos);
    setTodoEditing(null);
    setEditingText("");
  }

  return (
    <div className="App">
      <header className="App-header">
        <H1> Todo Lists</H1>
        <form onSubmit={handleSubmit}>
          <InputText
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <AddBtn type="submit"> Add Todo</AddBtn>
        </form>

        {todos.map((todo) => (
          <FlexWrapper key={todo.id}>
            <InputCheckbox
              type="checkbox"
              onChange={() => toggleComplete(todo.id)}
              checked={todo.completed}
              accent-color="#"
            />
            {todoEditing === todo.id ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText}
              />
            ) : (
              <PText>{todo.text}</PText>
            )}
            <div>
              {todoEditing === todo.id ? (
                <Btn onClick={() => editTodo(todo.id)}>Submit Edit</Btn>
              ) : (
                <Btn onClick={() => setTodoEditing(todo.id)}>Edit Todo</Btn>
              )}
              <DeleteBtn onClick={() => deleteTodo(todo.id)}>Delete</DeleteBtn>
            </div>
          </FlexWrapper>
        ))}
      </header>
    </div>
  );
}

export default App;
const H1 = styled.h1`
  color: #a4b4fb;
`;
const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  width: 60%;
  height: auto;
`;

const PText = styled.h3`
  font-size: 20px;
`;
const InputText = styled.input`
  width: 450px;
  height: 50px;
  margin-right: 20px;
  font-size: 24px;
  padding: 10px;
`;
const AddBtn = styled.button`
  padding: 25px 22px;
  font-size: 18px;
  background-color: #b4ecf4;
`;
const InputCheckbox = styled.input`
  width: 20px;
  height: auto;
  background-color: #282c34;
  border: 1px solid white;

  accent-color: #ffe57e;
`;
const Btn = styled.button`
  padding: 10px 10px;
  background-color: #c4c4fb;
  text-align: center;
  border-radius: 30px;
  border: none;
  margin-right: 5px;
`;
const DeleteBtn = styled.button`
  padding: 10px 10px;
  background-color: #fbc4dc;
  text-align: center;
  border-radius: 30px;
  border: none;
`;
