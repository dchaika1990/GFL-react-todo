import React, {Component} from 'react';
import List from "../list";
import SearchPanel from "../search-panel";
import AddItem from "../add-item";

const todos = [
	{id: 1, name: 'Learn React'},
	{id: 2, name: 'Make awesome website'},
	{id: 3, name: 'Find good job'},
	{id: 4, name: 'Well Done'},
];

const getTodos = async () =>
	new Promise(resolve => {
		setTimeout(() => {
			resolve(todos);
		}, 500);
	});

export default class App extends Component {
	state = {
		todos: null,
		hasError: false,
		term: ''
	};

	componentDidMount() {
		getTodos()
			.then(todos => {
				this.setState({
					todos,
				});
			})
			.catch(error => {
				console.log('eer');
				this.setState({
					hasError: true,
				});
			});
	}

	deleteHandler = id => {
		const newTodos = this.state.todos.filter(({id: itemId}) => id !== itemId);

		this.setState({
			todos: newTodos,
		});
	};

	addHandler = (name) => {
		const {todos} = this.state;
		console.log(name)

		if (name !== '') {
			const newId = todos[todos.length - 1].id + 1;
			const newTodo = {
				id: newId,
				name,
			}
			this.setState({
				todos: [...todos, newTodo],
			});
		}
	};

	onUpdateTerm = (term) => {
		this.setState({term})
	}

	searchPost = (items, term) => {
		if (term.length < 3) return items;
		return items.filter(item => typeof item === 'object' && item.name.toLowerCase().trim().indexOf(term) > -1)
	}

	//TODO:
	// 1. ADD filter for todo items (start filtering when search key length >= 3)

	render() {
		const {deleteHandler, addHandler, onUpdateTerm} = this;
		const {todos, hasError, term} = this.state;
		const visibleTodos = this.searchPost(todos, term);

		if (hasError && todos === null) return <p>Server ERROR</p>;
		if (todos === null) return <p>Loading...</p>;

		return (
			<div>
				<SearchPanel
					onUpdateTerm={onUpdateTerm}
				/>
				<h1>Todo LIST</h1>
				<List
					items={visibleTodos}
					clickHandler={deleteHandler}
				/>
				<br/>
				Enter new todo:
				<AddItem
					addTodo={addHandler}
				/>
			</div>
		);
	}
}
