"use strict"

const tasks = function (models, error) {

	const functions = {

		/*
		 * Simply return all stored tasks
		 */
		async read() {
			return models.tasks;
		},

		/*
		 * Create a new task or update an existing one if the given
		 * id already exists
		 */
		async upsert({ id, name, description, estimate, state }) {
			const tasks = models.tasks;
			for (let i = 0; i < tasks.length; i++) {
				if (tasks[i].id == id) {
					models.tasks[i] = { id,	name, description, estimate, state };
					return
				}
			}

			// auto-incrementing id that is synced with the frontend
			id = parseInt(tasks[tasks.length - 1].id) + 1;
			models.tasks.push({ id,	name, description, estimate, state });
			return id;
		},

		/*
		 * Delete a task if it exists
		 */
		async delete({ id }) {
			models.tasks = models.tasks.filter((task) => {
				return task.id != id;
			})
		}
	}

	return functions;
}

module.exports = tasks;