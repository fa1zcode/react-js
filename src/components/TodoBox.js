import React, { Component } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import axios from 'axios'


const request = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
});



export default class TodoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    request.get('todo').then((response)=>{
      if(response.data.success){
        this.setState({todos: response.data.data })
        console.log(response)
        console.log(this.state.todos)
      }else {
        alert(response.data.data)
      }
    }).catch((err)=>{
      alert('gagal masuk')
    })
  }

  addTodo = (title) => {
    const _id = Date.now()
    this.setState((state,props) => ({todos: [...state.todos,{_id, title}] }))
  };

  removeData = (id) => {
    this.setState((state,props) => ({todos: state.todos.filter(item => item._id !==id)  }))
  }

  render() {
    return (
      <div className="container" >
        <TodoForm add={this.addTodo} />
        <TodoList todos={this.state.todos} remove={this.removeData} />
      </div>
    );
  }
}
