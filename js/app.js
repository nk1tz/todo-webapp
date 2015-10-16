var API_URL = "https://todo-backend-nk1tz.c9.io/api";
var Backbone = require('backbone');
//var models = require("./models");
// var _ = require('underscore');
var React = require('react');
var ReactDOM = require('react-dom');

var TodoModel = Backbone.Model.extend({
    // defaults: {
    //     id: null,
    //     name: null,
    //     description: null,
    //     urgent: false,
    //     important: false,
    //     createdOn: new Date(),
    //     deadline: null,
    // }
});

var TodoCollection = Backbone.Collection.extend({
    url: API_URL + '/Todos',
    model: TodoModel,
});


module.exports = {
    
    // todoModel: todoModel,
    TodoCollection: TodoCollection
    
};


//REACT

var TodoListApp = React.createClass({
    loadTodosFromServer: function() {
        // $.ajax({
        //   url: this.props.url,
        //   dataType: 'json',
        //   cache: false,
        //   success: function(data) {
        //     this.setState({data: data});
        //   }.bind(this),
        //   error: function(xhr, status, err) {
        //     console.error(this.props.url, status, err.toString());
        //   }.bind(this)
        // });
            
            var ToDoList = new TodoCollection()
            return ToDoList.fetch().then(
            function(res) {
                console.log(res);
                console.log(ToDoList);
                
                
                // return an array of Todo Task
                //return ToDoList;
            }
    );        
        
    },
    componentDidMount: function() {
        this.loadTodosFromServer();
        setInterval(this.loadTodosFromServer, this.props.pollInterval);
    },
    getInitialState: function() {
        return {data: []};
    },
    handleTodoSubmit: function(todo) {
        var todos = this.state.data;
        var newTodos = todos.concat([todo]);
        this.setState({data: newTodos});
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          type: 'POST',
          data: todo,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    render: function() {
        return ( 
            <div className = "todoListApp">
                Hello, world!I am a TodoListApp 
                <AddTodo onTodoSubmit={this.handleTodoSubmit} />
                <h1> Todos </h1> 
                <TodoList data={this.state.data}/>
                
            </div>
        );
    }
});

var TodoList = React.createClass({
    render: function() {
        var todos = this.props.data.map(function(todo) {
            return (
                <Todo name={todo.name}>
                    {todo.description}
                </Todo>
            );
        });
        return (
            <div className='todoList'>
                {todos}
            </div>
        );
    }
});

var AddTodo = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var name = this.refs.name.value.trim();
        var description = this.refs.description.value.trim();
        if(this.refs.urgent.value){
            var urgent = true;
        }else{
            var urgent = false;
        }
        if(this.refs.important.value){
            var important = true;
        }else{
            var important = false;
        }
        var deadline = this.refs.deadline.value;
        var createdOn = new Date();
        if (!name) {
            return;
        }
        this.props.onTodoSubmit({
            name: name, 
            description: description,
            urgent: urgent,
            important: important,
            deadline: deadline,
            createdOn: createdOn
        });
        this.refs.name.value = '';
        this.refs.description.value = '';
        this.refs.deadline.value = "yyyy-MM-dd";
        return;
    },
    
    render: function() {
        return (
            <form className="addTodo" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="task name" ref="name" />
                <input type="text" placeholder="describe it" ref="description" />
                <label><input type="checkbox" id="urgentBox" value="urgent" ref="urgent" /> Urgent?</label>
                <label><input type="checkbox" id="importantBox" value="important" ref="important" /> Important?</label>
                <input type="date" placeholder="deadline" ref="deadline" />
                <input type="submit" value="Post" />
            </form>
        )
    }
});

var Todo = React.createClass({

    render: function() {
        return (
            <div className="todo">
                <h4 className="name">
                    {this.props.name}
                </h4>  
                {this.props.children}
            </div>
        );
    }
});


//instantiates the root component, starts the framework, and injects the markup into a raw DOM element, provided as the second argument.

ReactDOM.render(
    <TodoListApp url="https://todo-backend-nk1tz.c9.io/api/Todos" pollInterval="3000" />,
    // <TodoListApp data={data} />,
    document.getElementById('content')
);


