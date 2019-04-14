import createReducer from './createReducer'
import * as types from '../actions/types'

/*
 * Reducer for all actions related to Tasks
 */
export const tasks = createReducer([], {
	// Set the tasks
	[types.TASKS]: (state, action) => action.tasks,
	//Mark a task as editable so the text become input boxes
	[types.MARK_TASK_FOR_EDIT]: (state, action) => { // toggle editting
		let newState = [...state]
		for (let i = 0; i < newState.length; i++) {
			if (newState[i].id === action.id)
				newState[i].editing = !newState[i].editing;
		}
		return newState;
	},
	// Remove a task by it's id
	[types.REMOVE_TASK]: (state, action) => {
		let newState = [...state].filter((task) => {
			return task.id !== action.id;
		})
		return newState;
	},
	// Add a new, blank task to be edited 
	[types.ADD_TASK]: (state, action) => {
		const newState = [...state];
		
		/* 
		 * Given that this is a SPA, it is guaranteed that the last tasks
		 * id on the frontend will always be in sync with the backend's.
		 * For obvious reasons, this would create inconsistency with a
		 * multi-user app, but for simplicity, I have gone with this approach.
		 */

		const nextId = newState[newState.length - 1].id + 1;
		action.task.id = nextId;
		newState.push(action.task);

		return newState
	}
})