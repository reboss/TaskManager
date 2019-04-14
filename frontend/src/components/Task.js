import React, { Component } from 'react';
import { Button, Table } from "react-bootstrap";

import { connect } from 'react-redux'
import { ActionCreators } from '../actions'
import { bindActionCreators } from 'redux'

/*
 * Stateful component that renders a task as a table row element.
 * Allows for switching between edit and read-only mode.  The <input> 
 * tags are controlled by the local state which is initally passed down 
 * as props from the container, <AppContainer />
 */
class Task extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			description: this.props.description,
			estimate: this.props.estimate,
			state: this.props.state
		}
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		})
	}

	// Display the table such that a user can update the task
	editing() {
		let { id, saveEdit } = this.props;
		let { name, description, estimate, state } = this.state;
		return (
			<tr id={id}>
				<td><input id={'name'} value={name} onChange={this.handleChange}/></td>
				<td><input id={'description'} value={description} onChange={this.handleChange}/></td>
				<td><input id={'estimate'} value={estimate} onChange={this.handleChange} type={'number'} min={0}/></td>
				<td><select id={'state'} value={state} onChange={this.handleChange}>
					<option value="Planned" >Planned</option>
					<option value="In Progress">In Progress</option>
					<option value="Completed">Completed</option>
				</select>
				</td>
				<td className={'buttonCell'}>
					<Button onClick={() => saveEdit({id, name, description, estimate, state})}>
						Save
					</Button>
				</td>
			</tr>
		)
	}

	// Display the details only of a task
	readOnly() {
		let { id, startEdit, removeTask } = this.props;
		let { name, description, estimate, state } = this.state;
		return (
			<tr id={id}>
				<td>{name}</td>
				<td>{description}</td>
				<td>{estimate}</td>
				<td>{state}</td>
				<td className={'buttonCell'}>
					<Button onClick={() => startEdit(id)}>Change</Button>
				</td>
				<td className={'buttonCell'}>
					<Button onClick={() => removeTask(id)}>
						Delete
					</Button>
				</td>
			</tr>
		)
	}

	render() {
		if (this.props.editing)
			return this.editing();
		return this.readOnly();
	}
}

export default Task;