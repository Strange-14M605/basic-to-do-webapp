import React, { Fragment, useEffect, useState } from "react";

//components
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos"); //default GET req, returns JSON data
      //The response object contains the response body as a 'ReadableStream'
      const jsonData = await response.json();
      //The json() method reads the response body stream and parses it as JSON.

      // console.log(response);
      // console.log(jsonData);

      setTodos(jsonData);
      // console.log(todos);
    } catch (error) {
      console.error(error.message);
    }
  };

  //useEffect makes a HTTP req everytime the component is rendered
  useEffect(() => {
    getTodos();
  }, []); //the [] is to ensure useEffect makes only one req and not every millisecond!

  //delete function
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      //note: deleted from db but not todo variable

      // console.log(deleteTodo);
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            //   <tr>
            //     <td>John</td>
            //     <td>Doe</td>
            //     <td>john@example.com</td>
            //   </tr>
          }
          {todos.map((todo) => {
            return (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
