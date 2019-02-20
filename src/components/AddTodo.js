import React, { Component } from 'react';

export default class AddTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ''
        };
    }

    onChange = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({
            title: ''
        });
    }

    render() {
        return (
            <form style={{ display: 'flex' }} onSubmit={this.onSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Add todo"
                    style={{ flex: '10' }}
                    value={this.state.title}
                    onChange={this.onChange}
                />
                <button type="submit" style={{ flex: '1' }}>
                    Submit
        </button>
            </form>
        )
    }
}
