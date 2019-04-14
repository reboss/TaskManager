/*
	A handy function for that simplifies creating reducers by defining
	them as lookup tables.  
	See https://github.com/reduxjs/redux-starter-kit/blob/master/docs/api/createReducer.md
	for more details
*/
export default function createReducer(initialState, handlers) {
	return function (state = initialState, action) {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action)
		}
		return state
	}
}