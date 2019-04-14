import * as actions from './actionManifest'
import axios from 'axios'

// When running in dev mode, the api will run on port 3001
let url = 'http://localhost:3001';
if (process.env.NODE_ENV === 'production')
	// when in production, api will run on port 3000 and serve the built index.html
	// alternatively, one can specify the production url if splitting the project into microservices, etc.
	url = process.env.PRODUCTION_URL || 'http://localhost:3000';

// Get tasks
export function getTasks() {
	return (dispatch, state) => {
		axios.get(`${url}/v1/tasks`)
		.then((response) => {
			dispatch(actions.setTasks({ tasks: response.data }))
		})
	}
}

// Delete a task
export function removeTask(id) {
	return (dispatch, state) => {
		axios.delete(`${url}/v1/tasks/${id}`)
		.then((_) => {
			dispatch(actions.removeTask(id));
		})
	}
}

// Create a blank task for editing (does not sync with backend until user saves)
export function stageTask(task) {
	return (dispatch, state) => {
		dispatch(actions.addTask({task: {editing: true}}))
	}
}

// Save an edited task
export function updateTask(task) {
	return (dispatch, state) => {
		axios.post(`${url}/v1/tasks`, task)
		.then((response) => {
			dispatch(actions.markTaskForEdit(task.id))
		})
	}
}

// Toggle a task between editing and read-only mode
export function markTaskForEdit(id) {
	return (dispatch, state) => {
		dispatch(actions.markTaskForEdit(id))
	}
}