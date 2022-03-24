import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList (props){

    const nodeList = props.todos.map(item => (
      <TodoItem title={item.title} remove={() => props.remove(item._id)}/>
    ))
    return (
      <ol>
      {nodeList}
      </ol>
    );
}
