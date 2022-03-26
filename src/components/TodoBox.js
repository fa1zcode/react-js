import React, { Component } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export default class TodoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    request
      .get("todo")
      .then((response) => {
        if (response.data.success) {
          console.log(response);
          this.setState({
            todos: response.data.data.map((item) => {
              item.sent = true;
              return item;
            }),
          });

          // console.log(this.state.todos);
        } else {
          alert(response.data.data);
        }
      })
      .catch((err) => {
        alert("gagal masuk");
      });
  }

  addTodo = (title) => {
    //for add feature, better to show in front first and then send to database
    const _id = Date.now();  // this is temporary _id
    this.setState((state, props) => ({
      todos: [...state.todos, { _id, title, sent: true }],
    }));

    request
      .post("todo", { title })
      .then((response) => {
        //this add only need title (see the API on tryrestful API)
        this.setState((state, props) => ({
          todos: state.todos.map((item) => {
            if (item._id === _id) { // if data sent succesfully, replace the temporary _id with _id from database
              item._id = response.data._id;
            }
            return item;
          }),
        }));
      })
      .catch((err) => {
        this.setState((state, props) => ({
          todos: state.todos.map((item) => {
            if (item._id === _id) {
              item.sent = false;
            }
            return item;
          }),
        }));
      });
  };

  removeData = (id) => {
    //for delete feature, better to delete from the database first and then refresh
    request
      .delete(`todo/${id}`)
      .then((response) => {
        this.setState((state, props) => ({
          todos: state.todos.filter((item) => item._id !== id),
        }));
      })
      .catch((err) => {});
  };

  resendData = (id, title) => {
    request
      .post(`todo`, { title })
      .then((response) => {
        this.setState((state, props) => ({
          todos: state.todos.map((item) => {
            if (item._id === id) {
              item.sent = true;
            }
            return item;
          }),
        }));
      })
      .catch((err) => {});
  };

  render() {
    return (
      <div className="container">
        <TodoForm add={this.addTodo} />
        <TodoList
          todos={this.state.todos}
          remove={this.removeData}
          resend={this.resendData}
        />
      </div>
    );
  }
}
