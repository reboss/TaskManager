import * as types from './types'

export function setTasks({ tasks }) {
	return {
		type: types.TASKS,
		tasks
	}
}

export function markTaskForEdit(id) {
	return {
		type: types.MARK_TASK_FOR_EDIT,
		id: id
	}
}

export function removeTask(id) {
	return {
		type: types.REMOVE_TASK,
		id: id
	}
}

export function addTask({ task }) {
	return {
		type: types.ADD_TASK,
		task
	}
}