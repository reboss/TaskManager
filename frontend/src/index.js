import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducer from './reducers'
import AppContainer from './containers/AppContainer';
import * as serviceWorker from './serviceWorker';

process.env.PRODUCTION_URL = 'http://localhost:3000';

function configureStore(intialState) {
	const enhancer = compose(applyMiddleware(thunkMiddleware))
	return createStore(reducer, intialState, enhancer)
}

const store = configureStore({})

ReactDOM.render(<Provider store={store} >
	<AppContainer />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
