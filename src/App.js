import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Todos from './components/Todos';
import Header from './layout/Header';
import AddTodo from './components/AddTodo';
import About from './pages/About';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        };
    }

    componentDidMount = () => {
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20').then(res => {
            this.setState({
                todos: res.data
            });
        });
    }

    markComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }

                return todo;
            })
        });
    }

    addTodo = (title) => {
        const newTodo = {
            title: title,
            completed: false
        };

        axios.post('https://jsonplaceholder.typicode.com/todos', newTodo).then(res => {
            this.setState({
                todos: [...this.state.todos, res.data]
            });
        });
    }

    deleteTodo = (id) => {
        axios.delete('https://jsonplaceholder.typicode.com/todos/' + id).then(res => {
            this.setState({
                todos: [...this.state.todos.filter(todo => {
                    return todo.id !== id;
                })]
            });
        });
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <Header />
                    <Route exact path="/" render={props => (
                        <React.Fragment>
                            <AddTodo addTodo={this.addTodo} />
                            <Todos
                                todos={this.state.todos}
                                markComplete={this.markComplete}
                                deleteTodo={this.deleteTodo} />
                        </React.Fragment>
                    )} />
                    <Route path="/about" component={About} />
                </div>
            </Router>
        );
    }
}

export default App;
