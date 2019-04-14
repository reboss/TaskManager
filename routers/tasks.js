"use strict"

const tasksRouter = function (controllers, express) {

	const router = express.Router();
	const { tasks } = controllers;

	/*
	 * GET /v1/tasks
	 * 	returns [{
			id: INT,
			name: STRING,
			description: STRING,
			estimate: INT,
			state: STRING  // ideally this would be an enum
		}]
	 */
	router.get('/', (req, res, next) => {
		tasks.read().then((results) => {
			res.status(200).json(results)
		})
		.catch((err) => {
			next(err);
		})
	})

	/*
	 * POST /v1/tasks
	 * 	accepts {
			id: INT,
			name: STRING,
			estimate: INT,
			state: STRING
	 	}
	 	returns newId = id of newly created task || newId = undefined
	 */
	router.post('/', (req, res, next) => {
		tasks.upsert(req.body).then((id) => {
			res.status(201).json({
				newID: id
			});	
		})
		.catch((err) => {
			next(err);
		})
	})

	/*
	 * DELETE /v1/tasks/${id}
	 * params: id of the task to be deleted
	 * returns success message 'deleted'
	 */
	router.delete('/:id', (req, res, next) => {
		tasks.delete(req.params).then((results) => {
			res.status(201).json({
				message: 'deleted'
			});
		})
		.catch((err) => {
			next(err);
		})
	})

	return router;
}

module.exports = tasksRouter;