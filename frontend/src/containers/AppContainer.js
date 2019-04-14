import React, { Component } from 'react';
import { connect } from 'react-redux'

import { ActionCreators } from '../actions'
import { bindActionCreators } from 'redux'

import { Button, Table } from "react-bootstrap";


import './App.css';
import Task from '../components/Task'

/*
 * SPA Container for a task manager
 */
class AppContainer extends Component {

	componentDidMount() {
		this.props.getTasks();
	}

	// Iterate through tasks array and render a Task component for each
	renderTableRows() {
		if (this.props.tasks.length > 0) {
			return this.props.tasks.map((task) => {
				task.saveEdit = this.props.updateTask
				task.startEdit = this.props.markTaskForEdit
				task.removeTask = this.props.removeTask
				return <Task {...task} key={task.id}/>
			});
		}
	}

	render() {
		return (
			<div>
				<link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                />
				<Table striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
							<th>Estimate</th>
							<th>State</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.renderTableRows()}
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td className='buttonCell'>
								<Button onClick={() => this.props.stageTask()}>+</Button>
							</td>
						</tr>
					</tbody>
				</Table>

			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect((state) => {
    return {
    	tasks: state.tasks
    }
}, mapDispatchToProps)(AppContainer);