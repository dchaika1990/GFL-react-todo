import React, {Component} from "react";

export default class AddItem extends Component{
	state = {
		text: ''
	}

	onValueChange = (e) => {
		this.setState({
			text: e.target.value.trimLeft()
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.addTodo(this.state.text)
		this.setState({
			text: ''
		})
	}

	render() {
		return (
			<form
				onSubmit={this.onSubmit}
			>
				<input
					type={'text'}
					placeholder={'New todo'}
					onChange={this.onValueChange}
					value={this.state.text}
				/>
				<button
					type={'submit'}
				>
					Add new todo
				</button>
			</form>
		)
	}
}