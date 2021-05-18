import React, {Component} from "react";

export default class SearchPanel extends Component{
	state = {
		term: ''
	}

	onUpdateSearch = (e) => {
		const term = e.target.value.toLowerCase().trim();
		this.setState({term});
		this.props.onUpdateTerm(term)
	}

	render() {
		return (
			<input
				type={'text'}
				className={'search-input'}
				placeholder={'Search on todos'}
				onChange={this.onUpdateSearch}
			/>
		)
	}
}