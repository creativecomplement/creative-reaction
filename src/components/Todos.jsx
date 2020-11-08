import React from "react"
import TodoList from "./Todos/TodoList"
import Header from "./Todos/Header"
import InputTodo from "./Todos/InputTodo"
import returnRows from "./return-rows"

const apiKey = process.env.REACT_APP_SHEETS_KEY;

const sheetID = process.env.REACT_APP_TODO_SHEETS_ID;

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values:batchGet?ranges=todo_items&majorDimension=ROWS&key=${apiKey}`;
//const url = `https://jsonplaceholder.typicode.com/todos?_limit=10`
//  Trying out sheet.best (free to try) to simplify google sheets interaction for MVP
//const url = `https://sheet.best/api/sheets/6c0797c0-6210-4e29-a4f4-7e5b87024c9a`

class Todos extends React.Component{
    state = {
        todos: [
            {
                id: 1,
                title: "Setup development environment",
                completed: true
            },
            {
                id: 2,
                title: "Develop website and add content",
                completed: false
            },
            {
                id: 3,
                title: "Deploy to live server",
                completed: false
            }
        ]
    };

    handleChange = id => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id ===id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        })
    }

    delTodo = id => {
/*             axios
                .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
                .then(reponse =>
                this.setState({
                    todos: [
                    ...this.state.todos.filter(todo => {
                        return todo.id !== id
                    }),
                    ],
                })
                ) */
            }

    addTodoItem = title => {
/*         axios
            .post ("https://jsonplaceholder.typicode.com/todos/",
            {
            title: title,
            complete: false 
        })
        .then(response =>
            this.setState({
                todos: [...this.state.todos, response.data],
            })
        ) */
    };

    formatData = arg => {
        const arr = arg;
        const arrLength = arr.length;
        for (let i = 0; i < arrLength; i++) {
            arr[i].completed = Boolean(parseInt(arg[i].completed));
        }

        return arr;
    }

    componentDidMount() {

        //okay, check out sheety.co
        
        //axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
            //.then(response => this.setState({ todos: response.data }));

            fetch(url)
              .then(response => response.json())
              .then(data => {
                let batchRowValues = data.valueRanges[0].values;
                
                //pull out the sheets data
                const rows = returnRows(batchRowValues);

                //sheets data is all strings, format the data types
                this.setState({ todos: this.formatData(rows) });
              })
              .catch(error => {console.log(error);
            });

    }

    render() {
        return(
            <div className="todo_container">
                <Header />
                <InputTodo addTodoProps={this.addTodoItem} />
                <br></br>
                <TodoList todos={this.state.todos}
                handleChangeProps={this.handleChange}
                deleteTodoProps={this.delTodo} />
            </div>
        )
    }
}
export default Todos;